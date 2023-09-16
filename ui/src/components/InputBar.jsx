import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import RecordButton from './RecordButton';
import toWav from 'audiobuffer-to-wav';

const convertBlobToWav = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        try {
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                const wav = toWav(audioBuffer);
                resolve(wav);
              });
        } catch (e) {
            console.log(`An error occured while converting blob to wav: ${e}`)
        }
        
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

const InputBar = () => {
    const recorderControls = useAudioRecorder()
    const [isRecording, setIsRecording] = useState(false);
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        const audioForm = new FormData();
        audio.src = url;
        audio.controls = true;

        convertBlobToWav(blob)
        .then((wav) => { 
            audioForm.append("audio", wav);
        })
        .catch((error) => {
            console.error('Error converting Blob to WAV:', error);
        });

        fetch('https://localhost:5000/transcribe', {
            method: 'POST',
            body: audioForm
            })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
        };
    const startRecording = () => {
        recorderControls.startRecording();
        setIsRecording(true);
    }
    const stopRecording = () => {
        recorderControls.stopRecording();
        setIsRecording(false);
    }
    return(
        <div className="fixed bottom-0 w-full h-20 bg-[#424242] border-t-2 border-t-white z-10">
            <div className="hidden">
                <AudioRecorder 
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }} 
                    downloadFileExtension="wav"
                    recorderControls={recorderControls}
                />
            </div>
            <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} stopRecording={() => stopRecording()} startRecording={() => startRecording()}/>
        </div>


    );
}

export default InputBar;
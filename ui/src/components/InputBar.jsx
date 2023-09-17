import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import RecordButton from './RecordButton';
import toWav from 'audiobuffer-to-wav';
import axios from 'axios';

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
        const audioForm = new FormData();
        audioForm.append("blob", blob);

        axios.post('http://localhost:5000/transcribe', audioForm, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
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
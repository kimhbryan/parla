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

const InputBar = ({logs, setLogs}) => {
    const recorderControls = useAudioRecorder()
    const [isRecording, setIsRecording] = useState(false);
    const addAudioElement = (blob) => {
        const audioForm = new FormData();
        const chatForm = new FormData();
        audioForm.append("blob", blob);

        axios.post('http://localhost:5000/transcribe', audioForm, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((transcribeResponse) => {
            chatForm.append("message", transcribeResponse.data);
            chatForm.append("chat_history", logs);
            axios.post('http://localhost:5000/chat', chatForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((chatResponse) => {
                setLogs((logs) => [...logs, `USER: ${transcribeResponse.data}`, `AI: ${chatResponse.data}`])
                console.log({
                    success: chatResponse.data
                })
            }).catch((error) => {
                console.log(error);
            })
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
            {
                logs.length <= 8 ?
                <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} stopRecording={() => stopRecording()} startRecording={() => startRecording()}/>:
                <button className="border-none rounded-3xl w-30 h-15 bg-[#E0F1EA] text-[#355146] text-[0.75rem] font-semibold px-12 py-3 my-4">View Analysis</button>
            }
        </div>


    );
}

export default InputBar;
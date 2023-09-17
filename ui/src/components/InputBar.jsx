import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import RecordButton from './RecordButton';
import toWav from 'audiobuffer-to-wav';
import axios from 'axios';
import { transform } from 'lodash';

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
            console.log(`An error occured while converting blob: ${e}`)
        }
        
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

const InputBar = ({logs, setLogs, topic, lang}) => {
    const recorderControls = useAudioRecorder()
    const [isRecording, setIsRecording] = useState(false);
    const addAudioElement2 = async (blob) => {
        const audioForm = new FormData();
        const chatForm = new FormData();
        const translateForm = new FormData();
        const location = window.location.hostname;
        const logsCopy = [...logs]; // Make a copy of logs to avoid issues with state updates
    
    
        try {
            audioForm.append("blob", blob);
            audioForm.append("lang", lang);
            // Fetch transcription
            const fetchTranscribe = await fetch(`http://${location}:5000/transcribe`, {
                method: 'POST',
                body: audioForm,
            });
            const transcribeResponse = await fetchTranscribe.text();
    
            // Update logs with transcribe response
            logsCopy.push(`USER: ${transcribeResponse}`);
            
            chatForm.append("message", transcribeResponse);
            chatForm.append("chat_history", logsCopy.join('|'));
    
            // Fetch chat response
            const fetchChat = await fetch(`http://${location}:5000/chat/${topic}`, {
                method: 'POST',
                body: chatForm,
            });
            const chatResponse = await fetchChat.text();
            
            // // Update chatForm and fetch translation
            translateForm.append("text", chatResponse);
            translateForm.append("target", lang);
    
            // Fetch translation
            const fetchTranslate = await fetch(`http://${location}:5000/translate`, {
                method: 'POST',
                body: translateForm,
            });
            const translateResponse = await fetchTranslate.text();
            // console.log(translateResponse);
            setLogs((logs) => [...logs, `USER: ${transcribeResponse}`, `AI: ${translateResponse}`]);
        } catch (e) {
            console.error(e); // Handle errors more gracefully, e.g., show an error message
        }
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
                    onRecordingComplete={addAudioElement2}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }} 
                    downloadFileExtension="wav"
                    recorderControls={recorderControls}
                />
            </div>
            {
                logs.length <= 100 ?
                <RecordButton isRecording={isRecording} setIsRecording={setIsRecording} stopRecording={() => stopRecording()} startRecording={() => startRecording()}/>:
                <button className="border-none rounded-3xl w-30 h-15 bg-[#E0F1EA] text-[#355146] text-[0.75rem] font-semibold px-12 py-3 my-4">View Analysis</button>
            }
        </div>


    );
}

export default InputBar;
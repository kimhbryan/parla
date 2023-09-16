import {ReactComponent as ActivatedRecordingIndicator} from "../images/activatedRecordingIndicator.svg";
import {ReactComponent as StopRecordingIndicator} from "../images/stopRecordingIndicator.svg";

const RecordButton = ({stopRecording, startRecording, isRecording}) => {
    return(
        <button className="border-none rounded-3xl w-30 h-15 bg-white px-6 py-1 my-3" onClick={() => isRecording?stopRecording():startRecording()}>
            <span className="inline-flex">
                {
                    isRecording ?
                    <>
                        <StopRecordingIndicator className="w-5 h-5 left-0.5 mr-3" />
                        <p className="text-black text-sm">Finish Recording</p>
                    </> :
                    <>
                        <ActivatedRecordingIndicator className="w-5 h-5 left-0.5 mr-3" />
                        <p className="text-black text-sm">Press to Record</p>
                    </>
                }
            </span>
        </button>
    );
}

export default RecordButton;
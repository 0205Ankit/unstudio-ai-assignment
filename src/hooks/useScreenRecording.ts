/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import RecordRTC from "recordrtc";

type ScreenRecordingHookReturnType = {
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
  recordedBlob: Blob | null;
};

const useScreenRecording = (): ScreenRecordingHookReturnType => {
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        const rec = new RecordRTC(stream, {
          type: "video",
        });
        rec.startRecording();
        setRecorder(rec);
        setIsRecording(true);
        setMediaStream(stream);
      })
      .catch((err: Error) => console.error("Error accessing screen:", err));
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        setRecordedBlob(blob);
        setIsRecording(false);

        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
          setMediaStream(null); // Reset media stream state
        }
      });
    }
  };

  return { startRecording, stopRecording, isRecording, recordedBlob };
};

export default useScreenRecording;

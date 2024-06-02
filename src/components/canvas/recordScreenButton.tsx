"use client";
import React, { useEffect, useMemo } from "react";
import { BsRecord2 } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useScreenRecording from "@/hooks/useScreenRecording";
import { FaRegCircleStop } from "react-icons/fa6";
import useVideoUpload from "@/hooks/useVideoUpload";
import LoadingScreen from "../loading-screen";
import { convertBlobToMP4 } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { createVideo } from "@/mutations";
import { useToast } from "../ui/use-toast";

const RecordScreenButton: React.FC = (): JSX.Element => {
  const { startRecording, stopRecording, isRecording, recordedBlob } =
    useScreenRecording();
  const { isUploadingVideo, startUploading, videoUrl } = useVideoUpload();
  const memoizedUrl = useMemo(() => videoUrl, [videoUrl]);
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (url: string) => {
      await createVideo({ url });
    },
    onSuccess: () => {
      toast({
        title: "Video saved successfully",
        // description: `${data.id}`,
      });
    },
    onError: (err) => {
      console.log("err", err);
      toast({
        title: "Error while saving video!",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (recordedBlob) {
      const asyncFunction = async () => {
        const mp4Blob = await convertBlobToMP4(recordedBlob);
        startUploading(mp4Blob as Blob);
      };
      void asyncFunction();
    }
  }, [recordedBlob]);

  useEffect(() => {
    if (memoizedUrl) {
      mutate(memoizedUrl);
    }
  }, [memoizedUrl, mutate]);

  return (
    <>
      {isUploadingVideo && <LoadingScreen />}
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            {isRecording ? (
              <div
                className="rounded-md border p-2"
                onClick={() => {
                  stopRecording();
                }}
              >
                <span className="text-slate-500">
                  <FaRegCircleStop className="text-xl text-red-400" />
                </span>
              </div>
            ) : (
              <div
                className="rounded-md border p-2"
                onClick={() => {
                  startRecording();
                }}
              >
                <span className="text-slate-500">
                  <BsRecord2 className="text-xl" />
                </span>
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{isRecording ? "Stop Recording" : "Record your screen"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default RecordScreenButton;

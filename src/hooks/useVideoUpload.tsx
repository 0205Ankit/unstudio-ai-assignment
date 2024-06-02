import { useUploadThing } from "@/utils/uploadthing";
import React from "react";
import { useToast } from "../components/ui/use-toast";

const useVideoUpload = () => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = React.useState<string>();
  const [isUploadingVideo, setIsUploadingVideo] = React.useState(false);

  const { startUpload } = useUploadThing("videoFileUploader", {
    onClientUploadComplete: (data) => {
      setIsUploadingVideo(false);
      setVideoUrl(data[0]?.url);
    },
    onUploadError: (err) => {
      toast({
        title: err.message,
        description: "Can't upload more than 1 audio at once",
      });
    },
    onUploadBegin: () => {
      setIsUploadingVideo(true);
    },
  });

  const startUploading = (video: Blob) => {
    const videoFile = new File([video], "recorded_video.mp4", {
      type: "video/mp4",
    });
    void startUpload([videoFile]);
  };

  return {
    startUploading,
    isUploadingVideo,
    videoUrl,
  };
};

export default useVideoUpload;

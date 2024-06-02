import React, { useEffect } from "react";
import useSinglePhotoUpload from "@/hooks/single-picture-upload";
import LoadingScreen from "../loading-screen";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createImage } from "@/mutations";

const UploadPhotoButton = ({ text }: { text: string }) => {
  const queryClient = useQueryClient();
  const { getInputProps, getRootProps, isUploadingPhoto, photoUrl } =
    useSinglePhotoUpload();

  const { mutate } = useMutation({
    mutationFn: async (url: string) => await createImage({ url: url }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });

  useEffect(() => {
    if (photoUrl) {
      mutate(photoUrl);
    }
  }, [photoUrl, mutate]);

  return (
    <>
      {isUploadingPhoto && <LoadingScreen />}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button size={"sm"}>{text}</Button>
      </div>
    </>
  );
};

export default UploadPhotoButton;

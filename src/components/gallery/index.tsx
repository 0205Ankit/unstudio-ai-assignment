"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getImagesOfUser } from "@/queries";
import { LuAlertCircle } from "react-icons/lu";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadPhotoButton from "./uploadPhotoButton";
import Image from "next/image";
import { useDragContext } from "@/app/(context)/drag-context-provider";

const Gallery = () => {
  const { setDragItem } = useDragContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => await getImagesOfUser(),
  });

  const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    setDragItem(event.currentTarget.src);
  };

  return (
    <div className="h-[calc(100vh-130px)] w-1/2 overflow-hidden rounded-lg border">
      <div className="mx-5 flex items-center justify-between py-4">
        <span className="text-xl font-semibold">Gallery</span>{" "}
        <UploadPhotoButton text={"Upload"} />
      </div>
      <Separator />
      <div className="m-5">
        {isLoading ? (
          <ImagesSkeleton />
        ) : (
          <>
            {data && !error ? (
              <>
                {data.length <= 0 ? (
                  <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
                    <IoCloudUploadOutline className="text-[50px]" />
                    <span className="mb-3 text-lg font-medium">
                      No images found in your Gallery
                    </span>
                    <UploadPhotoButton text={"Upload Image"} />
                  </div>
                ) : (
                  <div className="flex w-full flex-wrap gap-5">
                    {data.map((image) => (
                      <Image
                        alt="image"
                        onDragStart={handleDragStart}
                        draggable="true"
                        width={180}
                        height={180}
                        key={image.id}
                        src={image.url}
                        className="h-[180px] w-[180px] cursor-pointer rounded-lg object-cover shadow-md"
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
                <LuAlertCircle className="text-[50px]" />
                <span className="text-lg font-medium">
                  Can&apos;t fetch Images
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;

const ImagesSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-wrap gap-5">
      <div className="h-[150px] w-[150px] rounded-lg bg-slate-400"></div>
      <div className="h-[150px] w-[150px] rounded-lg bg-slate-400"></div>
      <div className="h-[150px] w-[150px] rounded-lg bg-slate-400"></div>
    </div>
  );
};

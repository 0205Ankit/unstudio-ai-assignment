"use server";
import { db } from "@/server/db";
import { getServerAuthSession } from "./server/auth";

export const getImagesOfUser = async () => {
  const authUser = await getServerAuthSession();

  const images = await db.images.findMany({
    where: {
      userId: authUser?.user?.id,
    },
  });
  return images;
};

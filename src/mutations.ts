"use server";
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { getServerAuthSession } from "./server/auth";

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await db.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
    },
  });
  return user;
};

export const getImagesOfUser = async () => {
  const authUser = await getServerAuthSession();

  const images = await db.images.findMany({
    where: {
      userId: authUser?.user?.id,
    },
  });
  return images;
};

export const createImage = async ({ url }: { url: string }) => {
  const authUser = await getServerAuthSession();
  if (!authUser) throw new Error("Not authenticated");

  const image = await db.images.create({
    data: {
      userId: authUser.user.id,
      url,
    },
  });
  return image;
};

export const createVideo = async ({ url }: { url: string }) => {
  const authUser = await getServerAuthSession();
  if (!authUser) throw new Error("Not authenticated");

  const video = await db.videos.create({
    data: {
      userId: authUser.user.id,
      url,
    },
  });
  return video;
};

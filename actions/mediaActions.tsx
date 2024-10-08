"use server";

import { db } from "@/lib/db";
import { MediaProps } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createMedia(data: MediaProps) {
  try {
    const { slug, image, title } = data;
    const existingMedia = await db.mediaHouse.findUnique({
      where: { slug },
    });
    if (existingMedia) {
      return {
        data: null,
        error: `the above ${slug} category already  exists`,
        status: 409,
      };
    }

    const newMedia = await db.mediaHouse.create({
      data: {
        title,
        slug,
        image,
      },
    });
    revalidatePath("/dashboard/article-managment/add-media");
    revalidatePath("/dashboard/article-managment/add-article");
    return {
      data: newMedia,
      error: null,
      status: 201,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleMedia({ slug }: string | MediaProps) {
  try {
    const singleMedia = await db.mediaHouse.findUnique({
      where: { slug: slug },
    });
    return singleMedia;
  } catch (error) {
    console.log(error);
  }
}
export async function getMedia() {
  try {
    const getMedia = await db.mediaHouse.findMany();
    return getMedia;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteMedia({ id }: string | MediaProps | any) {
  try {
    const deltedItem = await db.mediaHouse.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/article-managment/add-media");
    revalidatePath("/dashboard/article-managment/add-article");
    console.log(deltedItem);
    return deltedItem;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMedia(data: MediaProps, id: string) {
  try {
    const updatedMedia = await db.mediaHouse.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/article-managment/add-media");
    revalidatePath("/dashboard/article-managment/add-article");
    console.log(updatedMedia);
    return updatedMedia;
  } catch (error) {
    console.log(error);
  }
}

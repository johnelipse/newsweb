import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { getAllCats } from "@/actions/catActions";
import Link from "next/link";
import DeleteBtn from "./deleteBtn";
import { getMedia } from "@/actions/mediaActions";
import Delete from "./deleteMedia";

export default async function MediaComp() {
  const media = await getMedia();

  return (
    <Card className="bg-[#0a0d13] backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white">Mediahouses of News</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {media?.map((category) => {
          return (
            <div
              key={category.id}
              className="flex items-center gap-4 justify-between text-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-[1.5rem] h-[1.5rem] rounded-full ">
                  <Image
                    width={262}
                    height={192}
                    className="w-full h-full rounded-full"
                    src={category.image as string}
                    alt="profile"
                  />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {category.title}
                  </p>
                </div>
              </div>
              <div className="ml-auto font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem><Link href={`/dashboard/article-managment/add-media/${category.slug}`}>Edit</Link></DropdownMenuItem>
                    <DropdownMenuItem><Delete id={category.id}/></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

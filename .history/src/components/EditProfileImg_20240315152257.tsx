"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  useState } from "react";
export function EditProfileImg(data: any) {
  const [img, setImg] = useState<string>(data.img[0]);
  const [name, setName] = useState<string>(data.img[1]);


  const renderImage = (fileObject:any) => {
    fileObject.image().then((img:any) => {
      const canvas = document.createElement("canvas");
      const ctx:any = canvas.getContext("2d");
      const maxWidth = 256;
      const maxHeight = 256;

      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = (img.width * ratio + 0.5) | 0;
      const height = (img.height * ratio + 0.5) | 0;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], img.name, fileObject);
        setImg(URL.createObjectURL(resizedFile));
        // handleChangeImage(resizedFile);
      });
    });
  };

  const handleImgChange = (e:any) => {
    const fileObject:any = e.target.files[0];
    if (!fileObject) return;
    renderImage(fileObject);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center items-center gap-4">
            <Avatar className="border-inherit border-2 w-40 h-40">
              <AvatarImage className="bg-inherit" src={img} />
              <AvatarFallback className="text-6xl">
                {name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={img} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between sm:justify-between">
            <Button type="submit" ><label htmlFor="file" className="cursor-pointer">Image</label></Button>
            <input type="file" id="file" className="hidden" onChange={(e)=>handleImgChange(e)}/>
            <Button type="submit">Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

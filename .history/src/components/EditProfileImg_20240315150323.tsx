"use client"
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
import {useState} from 'react'
export function EditProfileImg(data:any) {
  const [img, setImg] = useState<string>(data.img[0])
  const [name, setName] = useState<string>(data.img[1])
  console.log(data);
  
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
              <AvatarImage
                className="bg-inherit"
                src={img}
              />
              <AvatarFallback className="text-6xl">
                {name.slice(0,1)}
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
          <Button type="submit" className="mr-5" >Upload</Button>
          <input type="file" id="imgupload" className="hidden"/> 
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

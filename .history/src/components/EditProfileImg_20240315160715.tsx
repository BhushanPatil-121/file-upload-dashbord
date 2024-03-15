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
  const [showSaveButton , setShowSaveButton] = useState<boolean>(true)
  const [img, setImg] = useState<string>(data.img[0]);
  const [name, setName] = useState<string>(data.img[1]);


  const handleImgChange = (e:any) => {

    setShowSaveButton(false)
    const file = e.target.files[0];
    if(!file) return null
    const reader:FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e:ProgressEvent<FileReader>)  {
      const imageElement:any =document.createElement("img");
      if (!e.target) return
      imageElement.src = e.target.result;
      imageElement.onload = function(e:any){
        const canvas = document.createElement("canvas");
        if (!e.target) return
        const MAX_WITDH = 150;
        const scaleSize= MAX_WITDH / e.target.width;
        canvas.width = MAX_WITDH;
        canvas.height= e.target.height*scaleSize;
        const context:any = canvas.getContext("2d");
        context.drawImage(e.target, 0 ,0 , canvas.width, canvas.height)
        const newBase64= canvas.toDataURL("image/*") 
        setImg(newBase64);
      }
    };
  };

  const handleSave = async () => {
    let data = await fetch("/api", {
      method: "PUT",
      body: JSON.stringify(img),
    });
    data = await data.json();
    if (data) {
      alert("User Added !");
      // router.push("/profile");
    } else {
      alert("Error! please choose your profile or try again later.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
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
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between sm:justify-between">
            <Button type="submit" ><label htmlFor="file" className="cursor-pointer">Browse Image</label></Button>
            <input type="file" accept="image/*" id="file" className="hidden" onChange={(e)=>handleImgChange(e)}/>
            <Button type="submit" disabled={showSaveButton} onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

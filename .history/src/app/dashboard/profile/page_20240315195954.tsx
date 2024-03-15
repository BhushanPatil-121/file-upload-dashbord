"use client";
import { EditProfileImg } from "@/components/EditProfileImg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: sessionData } = useSession();
  const [session, setSession] = useState<any>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [image, setImage] = useState<string>();
  const [showSaveButton, setShowSaveButton] = useState<boolean>(true);
  // useEffect(() => {
  //   console.log(sessionData);
  //   setSession(sessionData);
  //   setName(sessionData?.user.name as string);
  //   setEmail(sessionData?.user.email as string);
  //   setImage(sessionData?.user.image as string);
  // }, [sessionData]);

  useEffect(() => {
    const getUserSession = async () => {
      let data:any = await fetch(`/api/getUserSession`);
      data = await data.json();
      // setSession(result);
      let userImage:any = await fetch(`/api/getUserProfile/${data.email}`);
      userImage = await userImage.json()  
      console.log("session",userImage.avatar);
      setImage(userImage.avatar)
    };
    getUserSession();
  }, [sessionData]);


  const handleImgChange = (e: any) => {
    setShowSaveButton(false);
    const file = e.target.files[0];
    if (!file) return null;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const imageElement: any = document.createElement("img");
      if (!e.target) return;
      imageElement.src = e.target.result;
      imageElement.onload = function (e: any) {
        const canvas = document.createElement("canvas");
        if (!e.target) return;
        const MAX_WITDH = 150;
        const scaleSize = MAX_WITDH / e.target.width;
        canvas.width = MAX_WITDH;
        canvas.height = e.target.height * scaleSize;
        const context: any = canvas.getContext("2d");
        context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        const newBase64 = canvas.toDataURL("image/*");
        setImg(newBase64);
      };
    };
  };

  const handleSave = async () => {
    const id = toast.loading("Updating Profile Image...");
    let data: any = await fetch("/api/updateUserProfile", {
      method: "POST",
      body: JSON.stringify({ img, email }),
    });
    data = await data.json();
    if (data.success === "true") {
      toast.success("Profile Update successfully", { id: id, position: "top-center" });
    } else {
      toast.error("Fail to update", { id: id, position: "top-center" });
    }
  };

  return (
    <div className="h-full">
      <div className=" flex flex-col lg:flex-row p-3 gap-2 ">
        <Card className=" shadow-md w-full lg:w-2/5 p-4 sm:p-6 lg:p-8   ">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">Your Profile</span>
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
                {name ? name.slice(0, 1): "A"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between sm:justify-between">
            <Button type="submit">
              <label htmlFor="file" className="cursor-pointer">
                Browse Image
              </label>
            </Button>
            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={(e) => handleImgChange(e)}
            />
            <Button
              type="submit"
              disabled={showSaveButton}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

            {/* <EditProfileImg img={[image, name, email]} /> */}
            {/* <Button
              variant={"outline"}
              className="dark:bg-slate-800 bg-slate-300"
            >
              <Link
                href="#"
                className="text-md font-bold text-inherit  rounded-full px-5 py-2 "
              >
                Edit
              </Link>
            </Button>
            <input type="file" id="imgupload" className="hidden"/>  */}
          </div>

          <span className="text-inherit">Change your profile photo</span>
          <div className="w-full p-8 mx-2 flex justify-center items-center ">
            <Avatar className="border-inherit border-2 w-40 h-40">
              <AvatarImage className="bg-inherit" src={image} />
              <AvatarFallback className="text-6xl">
                {session?.user.name?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </div>
        </Card>
        <Card className="w-full shadow-md lg:w-3/5 p-8 bg-inherit lg:ml-4 ">
          <div className="rounded   p-6">
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-inherit block pb-1"
              >
                Name
              </label>
              <Card className="flex">
                <input
                  disabled
                  id="username"
                  className="   rounded-r px-4 py-2 w-full"
                  type="text"
                  value={sessionData?.user.name as string || ""}
                />
              </Card>
            </div>
            <div className="pb-4">
              <label
                htmlFor="about"
                className="font-semibold text-inherit block pb-1"
              >
                Email
              </label>
              <Card>
                <input
                  disabled
                  id="email"
                  className="  rounded-r px-4 py-2 w-full"
                  type="email"
                  value={sessionData?.user.email as string || ""}
                />
              </Card>
              <span className="text-inherit pt-4 block opacity-70">
                Personal login information of your account
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
    // <div className="h-full">
    //   <div className=" block md:flex">
    //     <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-inherit shadow-black  ">
    //       <div className="flex justify-between">
    //         <span className="text-xl font-semibold block">Your Profile</span>
    //         <a
    //           href="#"
    //           className="-mt-2 text-md font-bold text-inherit  rounded-full px-5 py-2 hover:bg-gray-800"
    //         >
    //           Edit
    //         </a>
    //       </div>

    //       <span className="text-inherit">
    //         This information is secret so be careful
    //       </span>
    //       <div className="w-full p-8 mx-2 flex justify-center">
    //         <Image
    //           id="showImage"
    //           width={128}
    //           height={100}
    //           className="max-w-xs w-32 items-center border"
    //           src="/next.svg"
    //           alt=""
    //         />
    //       </div>
    //     </div>

    //     <div className="w-full md:w-3/5 p-8 bg-inherit lg:ml-4 ">
    //       <div className="rounded  shadow p-6">
    //         <div className="pb-6">
    //           <label
    //             htmlFor="name"
    //             className="font-semibold text-inherit block pb-1"
    //           >
    //             Name
    //           </label>
    //           <div className="flex">
    //             <input
    //               disabled
    //               id="username"
    //               className="   rounded-r px-4 py-2 w-full"
    //               type="text"
    //               value="Jane Name"
    //             />
    //           </div>
    //         </div>
    //         <div className="pb-4">
    //           <label
    //             htmlFor="about"
    //             className="font-semibold text-inherit block pb-1"
    //           >
    //             Email
    //           </label>
    //           <input
    //             disabled
    //             id="email"
    //             className="  rounded-r px-4 py-2 w-full"
    //             type="email"
    //             value="example@example.com"
    //           />
    //           <span className="text-inherit pt-4 block opacity-70">
    //             Personal login information of your account
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

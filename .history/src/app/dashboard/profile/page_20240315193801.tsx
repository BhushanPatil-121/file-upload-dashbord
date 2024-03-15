"use client";
import { EditProfileImg } from "@/components/EditProfileImg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: sessionData } = useSession();
  const [session, setSession] = useState<any>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  // useEffect(() => {
  //   console.log(sessionData);
  //   setSession(sessionData);
  //   setName(sessionData?.user.name as string);
  //   setEmail(sessionData?.user.email as string);
  //   setImage(sessionData?.user.image as string);
  // }, [sessionData]);

  useEffect(() => {
    const getUserSession = async () => {
      let data = await fetch(`/api/getUserSession`);
      data = await data.json();
      // setSession(result);
      console.log(data);
      let userImage = await fetch(`/api/getUserProfile/${data.email}`);
      userImage = await userImage.json()  
    };
    getUserSession();
  }, []);
  return (
    <div className="h-full">
      
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

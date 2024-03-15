// "use client"
import { EditProfileImg } from "@/components/EditProfileImg";
import { Avatar , AvatarImage ,AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProfilePage() {

  const data = await getServerSession();
  console.log(data);

  // const {data:session} = useSession();
  return (
    <div className="h-full
      <div className=" flex flex-col lg:flex-row p-3 gap-2 ">
        <Card className=" shadow-md w-full lg:w-2/5 p-4 sm:p-6 lg:p-8   ">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">Your Profile</span>
            <EditProfileImg img={[data?.user.image as string,data?.user.name as string, data?.user.email as string]}/>
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
              <AvatarImage
                className="bg-inherit"
                src={data?.user.image as string}
              />
              <AvatarFallback className="text-6xl">{data?.user.name?.slice(0, 1)}</AvatarFallback>
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
                  value={data?.user.name as string}
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
                  value={data?.user.email as string}
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

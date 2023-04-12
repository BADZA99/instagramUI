import Image from "next/image";
import React from "react";
import { PlusCircleIcon, magnifying } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import { useSession,signIn,signOut } from "next-auth/react";


export default function Header() {

  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className=" flex items-center justify-between max-w-7xl mx-4 xl:mx-auto">
        {/* left */}
        <div className="cursor-pointer h-24 w-24 pt-6 hidden lg:inline-grid">
          <Image
            src="http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png"
            width={100}
            height={200}
            className="object-contain"
            onClick={() => router.push("/")}
          />
        </div>

        <div className="cursor-pointer h-24 w-10 pt-6 lg:hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
            width={100}
            height={200}
            className="object-contain"
            onClick={() => router.push("/")}
          />
        </div>

        {/* middle */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            {/* <i class="fal fa-search h-5 text-gray-500">Search</i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {/* right */}

        <div className="flex space-x-4 items-center">
          <HomeIcon
            onClick={() => router.push("/")}
            className="hidden md:inline-flex h-6 w-8 mr-1 text-black cursor-pointer hover:scale-125 transition-transform duration-200 ease-out pr-1"
          />
          <PlusCircleIcon
            onClick={() => setOpen(true)}
            className="h-6 w-8 mr-6  text-black cursor-pointer hover:scale-125 transition-transform duration-200 ease-out pr-"
          />
          <img
            src="https://avatars.githubusercontent.com/u/97711454?v=4"
            alt="image de moi"
            className="h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

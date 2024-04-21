"use client";

import React from "react";
import { useAtom } from "jotai";
import { isDrawerOpened as isDrawerOpenedAtom } from "@/atoms/drawer";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar: React.FC = () => {
  const title = "Mangaland";
  const [isDrawerOpened, setIsDrawerOpened] = useAtom(isDrawerOpenedAtom);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setIsDrawerOpened(!isDrawerOpened)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <img src="/android-chrome-192x192.png" alt={title} className="h-8" />
        </Link>
      </div>
      <div className="flex">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;

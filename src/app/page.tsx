"use client";
import { ThemeSwitcher } from "@components/client/ThemeSwitcher";
import { Theme } from "@types";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import Image from "next/image";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import TextBox from "@components/TextBox";
import NpmUpdate from "@components/NpmUpdate";
import MobileQr from "@components/MobileQr";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import HankoAuth from "@components/HankoAuth";
import Head from "next/head";
import "react-medium-image-zoom/dist/styles.css";

const Zoom = dynamic(() => import("react-medium-image-zoom"), {
  ssr: false,
});

export default function Home() {
  const cookies = parseCookies();
  const theme = cookies?.theme === "dark" ? Theme.dark : Theme.light;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="fixed mb-5 left-0 top-0 flex w-full justify-center border-b border-zinc-200 shadow-md bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <code className="font-mono">
          Under&nbsp; construction.
          <p>
            Due to my machine&apos;s limitations I cannot get my auth+db
            implemented, apologies!
          </p>
        </code>
      </div>
      <ThemeSwitcher theme={theme} />

      <div className="flex justify-center items-center w-full">
        <Image
          className="dark:invert"
          src="/npm.png"
          alt="npm Logo with a dark mode toggle right above it"
          width={180}
          height={37}
          priority
        />
      </div>

      <Suspense fallback="Loading HankoAuth...">
        <div className="hanko_container">
          <HankoAuth
            setError={function (error: Error): void {
              throw new Error("Function not implemented.");
            }}
            darkTheme={false}
          />
        </div>
      </Suspense>

      <h1 className="flex text-2xl md:text-5xl font-extrabold text-center pt-3">
        Saving your favorite npm package since 1948.
      </h1>

      <div className=" text-red-500 py-5 flex flex-col items-center">
        <div className="flex-grow w-full">
          <TextBox />
        </div>

        <div className="h-full flex flex-row md:flex-row gap-2 items-center">
          <div className="">
            <div className="flex-grow mb-5">
              <NpmUpdate />
            </div>
            <div className="flex-grow my-[17px]">
              <MobileQr />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

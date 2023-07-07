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
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="grid place-items-center h-full p-10">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

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

      <h1 className="text-2xl md:text-5xl font-extrabold text-center max-w-6xl pt-3">
        Saving your favorite npm package since 1948.
      </h1>

      <div className="w-5/6 py-5 flex justify-center items-center">
        <TextBox />
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="flex-grow">
          <NpmUpdate />
        </div>
        <div className="flex-grow">
          <MobileQr />
        </div>
      </div>
    </main>
  );
}

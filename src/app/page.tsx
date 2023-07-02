"use client";
import { ThemeSwitcher } from "@components/client/ThemeSwitcher";
import { Theme } from "@types";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import Image from "next/image";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import TextBox from "@components/client/TextBox";
import NpmUpdate from "@components/client/NpmUpdate";
import MobileQr from "@components/MobileQr";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import HankoAuth from "@components/HankoAuth";

export default function Home() {
  const cookies = parseCookies();
  const theme = cookies?.theme === "dark" ? Theme.dark : Theme.light;
  const router = useRouter();

  return (
    <main className="grid place-items-center h-full p-10">
      <ThemeSwitcher theme={theme} />

      <div className="flex justify-center items-center">
        <Image
          className="dark:invert"
          src="/npm.png"
          alt="npm Logo with a dark mode toggle right above it to toggle"
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

      <h1 className="text-5xl md:text-8xl font-extrabold text-center max-w-6xl">
        Saving your favorite npm package since 1948.
      </h1>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-grow order-2 md:order-1">
          <NpmUpdate />
        </div>
        <div className="flex-grow order-1 md:order-2">
          <TextBox />
        </div>
        <div className="flex-grow order-3">
          <MobileQr />
        </div>
      </div>
    </main>
  );
}

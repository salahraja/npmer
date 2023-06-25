import { ThemeSwitcher } from "@components/client/theme-swither";
import { Theme } from "@types";
import { cookies } from "next/headers";
import Image from "next/image";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import TextBox from "@components/client/TextBox";
import NpmUpdate from "@components/client/NpmUpdate";
import MobileQr from "@components/MobileQr";

export default function Home() {
  const theme =
    cookies().get("theme")?.value === "dark" ? Theme.dark : Theme.light;
  return (
    <main className="grid place-items-center h-full p-10">
      <ThemeSwitcher theme={theme} />

      <div className="flex justify-center items-center">
        <Image
          className="dark:invert"
          src="/npm.png"
          alt="npm Logo with a dark mode toggle right above it"
          width={180}
          height={37}
          priority
        />
      </div>
      <h1 className=" text-5xl md:text-8xl font-extrabold text-center max-w-6xl ">
        Saving your favorite npm package since 1948.
      </h1>
      {/* https://technotrampoline.com/articles/how-to-access-a-localhost-website-from-your-mobile-device/ */}
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

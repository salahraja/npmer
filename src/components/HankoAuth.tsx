import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import styles from "./HankoProfile.module.css"; // Import CSS module

const hankoApi = "https://007385dc-60c3-4e38-bd4d-14dc24193b70.hanko.io";

interface HankoAuthProps {
  setError: (error: Error) => void;
  darkTheme: boolean;
}

export default function HankoAuth({ setError, darkTheme }: HankoAuthProps) {
  const router = useRouter();

  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi))
    );
  }, []);

  const redirectAfterLogin = useCallback(() => {
    // successfully logged in, redirect to a page in your application
    router.replace("...");
  }, [router]);

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    // register the component with shadow option
    register(hankoApi, { shadow: false, injectStyles: false }).catch(
      (error) => {
        setError(error);
      }
    );
  }, [setError]);

  return (
    <div className={darkTheme ? "hanko_container dark" : "hanko_container"}>
      <hanko-auth />
    </div>
  );
}

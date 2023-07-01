import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { register, Hanko } from "@teamhanko/hanko-elements";
import styles from "./HankoProfile.module.css"; // Import CSS module

const hankoApi = "https://007385dc-60c3-4e38-bd4d-14dc24193b70.hanko.io";

export default function HankoProfile() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko | undefined>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi))
    );
  }, []);

  const logout = () => {
    hanko?.user.logout().catch((error) => {
      // handle error
    });
  };

  useEffect(() => {
    const redirectAfterLogout = () => {
      // successfully logged out, redirect to a login page in your application
      router.replace("...");
    };

    if (hanko) {
      // register the component
      register(hankoApi).catch((error) => {
        // handle error
      });

      hanko.onUserLoggedOut(() => {
        redirectAfterLogout();
      });
    }
  }, [hanko, router]);

  return (
    <>
      <button onClick={logout}>Logout</button>
      <div className="hanko_container">
        <hanko-profile
          className={`${styles.hankoProfile} ${styles.blackBackground}`}
        />{" "}
      </div>
      {/* Apply CSS classes */}
    </>
  );
}

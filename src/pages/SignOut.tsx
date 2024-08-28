import { signOut } from "@/firebase/auth";
import { useEffect } from "react";

export default function SignOut() {
    useEffect(() => {
        const signOutUser = async () => {
            await signOut();
        };
        signOutUser();
    }, []);

  return <></>;
}
"use client";
import { useAuth } from "@/store/AuthContext";
import { createClient } from "@/util/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderButton() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    router.push("/");

    if (error) {
      console.log(error);
    }
  };
  return (
    <>
      {currentUser ? (
        <button
          className="bg-green-500 py-1 px-2 text-white"
          onClick={handleLogout}
        >
          ログアウト
        </button>
      ) : (
        <Link className="bg-green-500 py-1 px-2 text-white" href={"/login"}>
          ログイン
        </Link>
      )}
    </>
  );
}

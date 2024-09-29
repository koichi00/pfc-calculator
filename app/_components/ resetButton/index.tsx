"use client";
import { useAuth } from "@/store/AuthContext";
import { createClient } from "@/util/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetButton() {
  const { currentUser } = useAuth();
  const supabase = createClient();
  const router = useRouter();
  const handleClick = async () => {
    const { data, error } = await supabase
      .from("user_profile")
      .update({
        protain: 0,
        fat: 0,
        carbo: 0,
      })
      .eq("id", currentUser?.id!)
      .single();
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white block p-2 rounded-md tracking-widest font-bold hover:bg-red-500 transition mt-3 w-1/3"
    >
      RESET
    </button>
  );
}

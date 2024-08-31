"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function ResetButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const handleClick = async () => {
    const { data, error } = await supabase
      .from("profile")
      .update({
        protein: 0,
        fat: 0,
        carbo: 0,
        total_cal: 0,
      })
      .eq("id", 1)
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

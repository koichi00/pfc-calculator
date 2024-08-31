import { createClient } from "@/util/supabase/sever";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const payload = await req.formData();
  const targetValue = payload.get("target");

  // 型ガードを使って、FormDataEntryValue が string かどうかを確認する
  const target = typeof targetValue === "string" ? parseInt(targetValue) : 0;

  const { data, error } = await supabase
    .from("profile")
    .update({
      target_cal: target,
    })
    .eq("id", 1)
    .single();

  return NextResponse.json({ message: "updated" });
}

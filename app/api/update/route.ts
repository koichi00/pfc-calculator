import { createClient } from "@/util/supabase/sever";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("ユーザーが認証されていません");
  }

  const payload = await req.formData();
  const proteinValue = payload.get("protein");
  const fatValue = payload.get("fat");
  const carboValue = payload.get("carbo");

  // 型ガードを使って、FormDataEntryValue が string かどうかを確認する
  const protein = typeof proteinValue === "string" ? parseInt(proteinValue) : 0;
  const fat = typeof fatValue === "string" ? parseInt(fatValue) : 0;
  const carbo = typeof carboValue === "string" ? parseInt(carboValue) : 0;

  const { data: nowProfile } = await supabase
    .from("user_profile")
    .select("*")
    .single();

  const { data, error } = await supabase
    .from("user_profile")
    .update({
      protain: nowProfile?.protain! + protein,
      fat: nowProfile?.fat! + fat,
      carbo: nowProfile?.carbo! + carbo,
    })
    .eq("id", user.id)
    .single();

  console.log(error);

  return NextResponse.json({ message: "updated" });
}

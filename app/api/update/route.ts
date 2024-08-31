import { createClient } from "@/util/supabase/sever";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const payload = await req.formData();
  const proteinValue = payload.get("protein");
  const fatValue = payload.get("fat");
  const carboValue = payload.get("carbo");

  // 型ガードを使って、FormDataEntryValue が string かどうかを確認する
  const protein = typeof proteinValue === "string" ? parseInt(proteinValue) : 0;
  const fat = typeof fatValue === "string" ? parseInt(fatValue) : 0;
  const carbo = typeof carboValue === "string" ? parseInt(carboValue) : 0;
  const { data: nowProfile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single();

  const { data, error } = await supabase
    .from("profile")
    .update({
      protein: nowProfile.protein + protein,
      fat: nowProfile.fat + fat,
      carbo: nowProfile.carbo + carbo,
      total_cal: nowProfile.total_cal + protein * 4 + fat * 9 + carbo * 4,
    })
    .eq("id", 1)
    .single();

  return NextResponse.json({ message: "test" });
}

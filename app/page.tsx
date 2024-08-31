import { createClient } from "@/util/supabase/sever";
import MyForm from "./_components/updateFrom";
import UpdateTarget from "./_components/upadateTarget";

export default async function Home() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single();
  return (
    <main className="max-w-[1100px] mx-auto px-4 py-4">
      <div className="p-4 border border-slate-400 rounded-md mb-1 bg-slate-100 text-center">
        <div className="border-b pb-2 ">
          <div className="font-sm font-bold">Target</div>
          <div className="text-2xl font-bold">
            {profile.target_cal}
            <span className="text-lg">kcal</span>
          </div>
        </div>
        <div className="pt-2">
          <div className="font-sm font-bold">Total</div>
          <div className="text-2xl font-bold">
            {profile.total_cal ?? 0}
            <span className="text-lg">kcal</span>
          </div>
          <div className="text-[12px] text-red-600 mt-1">
            残り{profile.target_cal - profile.total_cal}kcal
          </div>
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex-1 border-slate-400 border rounded-md py-3 px-1 bg-red-200 text-center flex flex-col items-center">
          <p className="text-sm font-bold">Protein</p>
          <p className="text-2xl font-bold">
            {profile.protein}
            <span className="text-lg">g</span>
          </p>
          <p className="text-sm font-bold text-gray-700">
            {profile.protein * 4}
            <span className="text-[12px]">kcal</span>
          </p>
        </div>
        <div className="flex-1 border-slate-400 border rounded-md py-3 px-1 bg-yellow-200 text-center flex flex-col items-center">
          <p className="text-sm font-bold">Fat</p>
          <p className="text-2xl font-bold">{profile.fat}</p>
          <p className="text-sm font-bold text-gray-700">
            {profile.fat * 9}
            <span className="text-[12px]">kcal</span>
          </p>
        </div>
        <div className="flex-1 border-slate-400 border rounded-md py-3 px-1 bg-orange-200 text-center flex flex-col items-center">
          <p className="text-sm font-bold">Carbo</p>
          <p className="text-2xl font-bold">{profile.carbo}</p>
          <p className="text-sm font-bold text-gray-700">
            {profile.carbo * 4}
            <span className="text-[12px]">kcal</span>
          </p>
        </div>
      </div>
      <MyForm />
      <UpdateTarget />
    </main>
  );
}

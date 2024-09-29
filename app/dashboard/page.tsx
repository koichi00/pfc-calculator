import { createClient } from "@/util/supabase/sever";
import Myform from "../_components/updateFrom";
import UpdateTarget from "../_components/upadateTarget";

export default async function Page() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("user_profile")
    .select("*")
    .single();
  return (
    <main className="max-w-[1100px] mx-auto px-4 py-4">
      <div className="p-4 border border-slate-400 rounded-md mb-1 bg-slate-100 text-center">
        <div className="border-b pb-2 ">
          <div className="font-sm font-bold">目標カロリー</div>
          <div className="text-2xl font-bold">
            {profile?.target_cal}
            <span className="text-lg">kcal</span>
          </div>
        </div>
        <div className="pt-2">
          <div className="font-sm font-bold">現在の摂取カロリー</div>
          <div className="text-2xl font-bold">
            {profile?.protain! * 4 + profile?.fat! * 9 + profile?.carbo! * 4}
            <span className="text-lg">kcal</span>
          </div>
          <div className="text-[12px] text-red-600 mt-1">
            残り
            {profile?.target_cal! -
              (profile?.protain! * 4 + profile?.fat! * 9 + profile?.carbo! * 4)}
            kcal
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex-1 border-slate-400 border rounded-md py-3 px-1 bg-red-200 text-center flex flex-col items-center">
          <p className="text-sm font-bold">タンパク質</p>
          <p className="text-2xl font-bold">
            {profile?.protain}
            <span className="text-lg">g</span>
          </p>
          <p className="text-sm font-bold text-gray-700">
            {profile?.protain! * 4}
            <span className="text-[12px]">kcal</span>
          </p>
        </div>
        <div className="flex-1 border-slate-400 border rounded-md py-3 px-1 bg-yellow-200 text-center flex flex-col items-center">
          <p className="text-sm font-bold">脂質</p>
          <p className="text-2xl font-bold">{profile?.fat}</p>
          <p className="text-sm font-bold text-gray-700">
            {profile?.fat! * 9}
            <span className="text-[12px]">kcal</span>
          </p>
        </div>
        <div className="flex-1 border-slate-400 border rounded-md py-3 px-1 bg-orange-200 text-center flex flex-col items-center">
          <p className="text-sm font-bold">炭水化物</p>
          <p className="text-2xl font-bold">{profile?.carbo}</p>
          <p className="text-sm font-bold text-gray-700">
            {profile?.carbo! * 4}
            <span className="text-[12px]">kcal</span>
          </p>
        </div>
      </div>
      <Myform />
      <UpdateTarget />
    </main>
  );
}

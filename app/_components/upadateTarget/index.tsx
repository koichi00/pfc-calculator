"use client";
import { useRouter } from "next/navigation";
import ResetButton from "../ resetButton";

export default function UpdateTarget() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/update-target`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("エラーが発生しました。");
        }
        return res.json() as Promise<{ msg: string }>;
      })
      .then((data) => {
        form.reset();
        router.refresh();
      })
      .catch((e: Error) => {
        console.error("Fetch Error", e.message);
      });
  };
  return (
    <form
      className="border border-slate-400 rounded-md py-4 px-4 mt-1 bg-white"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-around gap-2 items-center">
        <label className="w-full" htmlFor="target">
          <div className="mb-2">
            <p className="mb-1 font-bold">Target</p>
            <input
              className="border rounded-md p-1 outline-none focus:bg-gray-50 w-full block"
              type="number"
              name="target"
              id="target"
              defaultValue={0}
            />
          </div>
        </label>
        <button
          className="bg-slate-600 text-white block p-2 rounded-md tracking-widest font-bold hover:bg-slate-500 transition mt-3 w-1/3"
          type="submit"
        >
          UPDATE
        </button>
      </div>
    </form>
  );
}

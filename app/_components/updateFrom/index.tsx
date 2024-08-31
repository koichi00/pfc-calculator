"use client";
import { useRouter } from "next/navigation";
import ResetButton from "../ resetButton";

export default function Myform() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    fetch("api/update", { method: "POST", body: formData })
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
      className="border border-slate-400 rounded-md py-4 px-4 mt-1"
      onSubmit={handleSubmit}
    >
      <div className="lg:flex md:justify-around md:gap-1">
        <label className="md:flex-1" htmlFor="p">
          <div className="mb-2">
            <p className="mb-1 font-bold">Protein</p>
            <input
              className="border rounded-md p-1 outline-none focus:bg-gray-50 w-full block"
              type="number"
              name="protein"
              id="p"
              defaultValue={0}
            />
          </div>
        </label>
        <label htmlFor="f" className="md:flex-1">
          <div className="mb-2">
            <p className="mb-1 font-bold">Fat</p>
            <input
              className="border rounded-md p-1 outline-none focus:bg-gray-50 w-full block"
              type="number"
              name="fat"
              id="f"
              defaultValue={0}
            />
          </div>
        </label>
        <label className="md:flex-1" htmlFor="c">
          <div className="mb-2">
            <p className="mb-1 font-bold">Carbo</p>
            <input
              className="border rounded-md p-1 outline-none focus:bg-gray-50 w-full block"
              type="number"
              name="carbo"
              id="c"
              defaultValue={0}
            />
          </div>
        </label>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-slate-600 text-white block w-full p-2 rounded-md tracking-widest font-bold hover:bg-slate-500 transition mt-3"
          type="submit"
        >
          UPDATE
        </button>
        <ResetButton />
      </div>
    </form>
  );
}

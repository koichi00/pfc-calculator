import Link from "next/link";

export default function RegisterSuccess() {
  return (
    <main>
      <div className="text-center">
        <h2 className="text-2xl font-bold mt-6">
          アカウント登録が完了致しました。
        </h2>
        <div>
          <Link
            className="py-2 px-4 block w-[90%] max-w-[300px] bg-green-500 text-white text-center mx-auto mt-5"
            href={"/login"}
          >
            ログインする
          </Link>
        </div>
      </div>
    </main>
  );
}

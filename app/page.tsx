import Link from "next/link";
export default function Page() {
  return (
    <main className="max-w-[1100px] mx-auto px-4 py-4">
      <div className="mt-8 px-4">
        <h2 className="text-3xl font-bold text-center leading-relaxed tracking-widest">
          毎日の作業を
          <br className="lg:hidden" />
          簡単に。
        </h2>
        <p className="mt-12">
          体づくりにおいてカロリー計算を避けられない作業です。なるべく同じような作業に時間を使うのは勿体無いです。PFC
          calculatorを使って、毎日の面倒な計算を簡単にしましょう。
        </p>
        <ul className="mt-8">
          <li className="mt-5">
            <p className="font-bold border-l-4 pl-1 border-slate-600">
              わかりやすさ重視で直感的に操作できる
            </p>
            <p className="mt-2">
              1日に何回も行う作業だから、なるべくスピーディーに操作が行えるように複雑な操作なしで簡単に操作できます。
            </p>
          </li>
          <li className="mt-5">
            <p className="font-bold border-l-4 pl-1 border-slate-600">
              必要な情報をぱっと見て把握
            </p>
            <p className="mt-2">
              タンパク質、脂質、炭水化物それぞれをどのくらい取っているかを、一瞬で把握できるよう無駄を削ぎ落とし必要な情報を、すぐに確認できます。
            </p>
          </li>
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="bg-green-500 py-3 px-2 text-white w-full block max-w-[400px] mx-auto"
          >
            アカウントを作る
          </Link>
        </div>
      </div>
    </main>
  );
}

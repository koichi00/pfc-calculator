"use client";
import { registerAction } from "./action";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import style from "./style.module.css";
import { useState } from "react";
// Zodスキーマの定義
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須項目です") // 空文字を防ぐために最小1文字を要求
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(1, "パスワードは必須項目です") // 空文字を防ぐために最小1文字を要求
    .min(8, "パスワードは8文字以上で入力してください")
    .max(32, "パスワードは32文字以下で入力してください"),
});
interface submitArg {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [failedLogin, setFailedLogin] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<submitArg>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: submitArg) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await registerAction(formData);

    if (result) {
      setFailedLogin(true);
    }
    if (!result) {
      router.push("/register/success");
    }
  };
  return (
    <div className={`flex items-center justify-center ${style.formWrap}`}>
      <form
        className="bg-white py-10 px-6 rounded-md shadow-lg w-[90%] max-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4">新規登録</h2>
        {failedLogin && (
          <p className="text-red-500 text-sm font-bold`">
            ログインに失敗しました。
          </p>
        )}
        <label className="block mb-4" htmlFor="email">
          <p className="mb-1">メールアドレス</p>
          <input
            className="p-2 outline-none border border-gray-200 w-full"
            type="text"
            {...register("email")}
            id="email"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>
        <label className="block mb-6" htmlFor="password">
          <p className="mb-1">パスワード</p>
          <input
            className="p-2 outline-none border border-gray-200 w-full"
            type="password"
            {...register("password")}
            id="password"
            placeholder="8文字以上"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>

        <button
          className="py-2 px-4 block w-full bg-green-500 text-white"
          type="submit"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}

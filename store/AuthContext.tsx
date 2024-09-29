"use client";

import { createClient } from "@/util/supabase/client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthContextState {
  currentUser: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    // 初期ロードでユーザー情報を取得
    getUserSession();

    // 認証状態の変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        // router.refresh(); // ページをリフレッシュ
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser: user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("context AuthProvider内で呼び出してください。");
  }
  return context;
};

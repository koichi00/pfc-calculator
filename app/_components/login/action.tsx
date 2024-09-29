"use server";

import { createClient } from "@/util/supabase/sever";
async function loginAction(formData: FormData) {
  const serverSupabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await serverSupabase.auth.signInWithPassword(data);
  if (error) {
    return true;
  }
  return false;
}

// register
async function registerAction(formData: FormData) {
  const serverSupabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await serverSupabase.auth.signUp(data);
  if (error) {
    return true;
  }
  if (!error) {
    return false;
  }
}

export { loginAction, registerAction };

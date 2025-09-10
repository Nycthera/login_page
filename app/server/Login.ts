// app/server/Login.ts
"use server";
import { account } from "../backend/appwrite.config"

export async function login({ email, password }: { email: string; password: string }) {
  try {
    // Use createEmailSession for email/password login
    const session = await account.createSession(email, password);
    return { success: true, session };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

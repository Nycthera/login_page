// app/server/Logout.ts
"use server";
import { account } from "../backend/appwrite.config"

export async function logout() {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// app/server/CreateAccount.ts
"use server";
import { account, ID} from "../backend/appwrite.config"

export async function createAccount({ email, password, name }: { email: string; password: string; name: string }) {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}


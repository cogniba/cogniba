// "use server";

// import * as z from "zod";

// import { signIn } from "@/auth/auth";
// import { SignInSchema } from "@/zod/schemas/SignInSchema";
// import { AuthError } from "next-auth";
// import { isRedirectError } from "next/dist/client/components/redirect";

// export default async function handleSignIn(
//   data: z.infer<typeof SignInSchema>,
// ): Promise<{ success?: string; error?: string }> {
//   const validatedData = SignInSchema.safeParse(data);
//   if (!validatedData.success) {
//     return { error: "Invalid credentials" };
//   }

//   const { username, password } = validatedData.data;

//   try {
//     await signIn("credentials", {
//       username,
//       password,
//       redirectTo: "/app/play",
//     });
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     } else if (error instanceof AuthError) {
//       if (error.type === "CredentialsSignin") {
//         return { error: "Invalid credentials" };
//       }
//     }

//     return { error: "Something went wrong" };
//   }

//   return { success: "Sign in success" };
// }

// ("use server");

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { createClient } from "@/lib/supabase/server";

// export async function login(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }

// export async function signup(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }

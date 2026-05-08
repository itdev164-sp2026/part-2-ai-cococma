"use server"

import { projectSchema, type Project } from "@/lib/schemas"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export type ActionResult =
  | { success: true }
  | { success: false; error: string }

export async function createProject(data: Project): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid data" }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { error } = await supabase
    .from("projects")
    .insert({ ...parsed.data, user_id: user.id, created_at: new Date().toISOString() })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

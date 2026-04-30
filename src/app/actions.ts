"use server"

import { projectSchema, type Project } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export type ActionResult =
  | { success: true }
  | { success: false; error: string }

export async function createProject(data: Project): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid data" }
  }

  const { error } = await supabase.from("projects").insert(parsed.data)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

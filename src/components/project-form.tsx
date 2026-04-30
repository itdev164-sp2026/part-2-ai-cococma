"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { projectSchema, type Project } from "@/lib/schemas"
import { createProject } from "@/app/actions"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
  })

  async function onSubmit(data: Project) {
    const result = await createProject(data)
    if (result.success) {
      toast.success("Project created successfully!")
      reset()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field data-invalid={!!errors.title || undefined}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          placeholder="Enter project title"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
        <FieldError errors={errors.title ? [errors.title] : undefined} />
      </Field>

      <Field data-invalid={!!errors.description || undefined}>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          placeholder="Describe the project"
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        <FieldError errors={errors.description ? [errors.description] : undefined} />
      </Field>

      <Field data-invalid={!!errors.status || undefined}>
        <FieldLabel>Status</FieldLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                aria-invalid={!!errors.status}
                className="w-full"
              >
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={errors.status ? [errors.status] : undefined} />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  )
}

"use client"

import { useState, useTransition } from "react"
import { signIn, signUp } from "./actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      const result = await (mode === "signin" ? signIn : signUp)(formData)
      if (result?.error) setError(result.error)
    })
  }

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"))
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {mode === "signin" ? "Sign in" : "Create account"}
          </CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Enter your credentials to access your dashboard"
              : "Enter your details to create an account"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending
                ? mode === "signin"
                  ? "Signing in…"
                  : "Creating account…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary underline-offset-4 hover:underline font-medium"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

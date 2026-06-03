"use client"

import type { User } from "@supabase/supabase-js"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { useEffect, useState } from "react"
import { LogoutButton } from "./logout-button"

export function AuthNav({ initialUser }: { initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser)

  useEffect(() => {
    const supabase = createBrowserClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return user ? <LogoutButton /> : null
}

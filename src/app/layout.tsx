import { createServerClient } from "@/lib/supabase/createServerClient"
import type { Metadata } from "next"
import { AuthNav } from "@/components/supabase/auth-nav"

import { APP_TITLE } from "@/constants/app"

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "Yet-to-be-named project for cs464",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await createServerClient()
  const { data } = await client.auth.getUser()
  return (
    <html lang="en">
      <body>
        <AuthNav initialUser={data.user} />
        {children}
      </body>
    </html>
  );
}

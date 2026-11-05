# AgriConnect

## Supabase setup

1. Create a Supabase project, then open **Project Settings → API**.
2. Copy the project URL and the public anon/publishable key to a new `.env.local` file in the project root. Use `.env.example` as the template.
3. In the Supabase dashboard, enable **Authentication → Providers → Email**. Configure the site URL and redirect URLs for your local and deployed app.
4. Restart the Vite development server after creating or changing `.env.local`.

The Login/Register page uses Supabase email/password authentication. Registration stores the submitted full name and phone number in the user's auth metadata. If email confirmation is enabled in Supabase, users must confirm their email before logging in.

Only the public anon/publishable key belongs in this browser app. Never put a Supabase service-role key in a `VITE_` variable or commit `.env.local`.
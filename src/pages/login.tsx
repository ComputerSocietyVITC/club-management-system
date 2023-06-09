import { browserClient } from "@cms/components/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthForm() {
  let supabase = browserClient;
  return (
    <section className="flex flex-auto items-center justify-center dark:bg-zinc-800 h-screen">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        showLinks={false}
        providers={["google"]}
        redirectTo="http://localhost:3000/"
      />
    </section>
  );
}

"use client";

import LoginForm from "@/components/pages/login/Form";
import Hero from "@/components/pages/login/Hero";

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-[520px_1fr] gap-4 lg:gap-8 items-stretch">
      <section className="hidden lg:block">
        <Hero size="lg" />
      </section>
      <section className="lg:hidden px-2">
        <Hero size="sm" />
      </section>
      <section className="content-center">
        <div>
          <LoginForm />
        </div>
      </section>
    </div>
  );
}

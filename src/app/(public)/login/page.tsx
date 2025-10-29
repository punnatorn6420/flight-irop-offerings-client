"use client";

import Brand from "@/components/pages/consent/Brand";
import LoginForm from "@/components/pages/login/Form";
import Hero from "@/components/pages/login/Hero";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <div className="md:hidden mt-4">
        <div className="max-w-screen-sm mx-auto p-4">
          <Brand />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-2 md:px-4 py-4 md:py-6">
        <div className="grid md:grid-cols-[400px_1fr] gap-8 md:gap-14 items-stretch">
          <section className="hidden md:block">
            <Hero size="lg" />
          </section>
          <section className="md:hidden px-2">
            <Hero size="sm" />
          </section>

          <section className="flex flex-col md:h-[640px]">
            <div className="hidden md:block mt-4 mb-24">
              <Brand />
            </div>
            <div className="flex-1 px-2 md:px-0">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
      <footer className="pt-12 text-center text-[18px] text-grey-800">
        © 2017 บริษัท สายการบินนกแอร์ จำกัด (มหาชน)
      </footer>
    </main>
  );
}

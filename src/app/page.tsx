import Image from "next/image";
import { SkillsGrid } from "@/components/skills-grid";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Cole Abraham
            </h1>
            <p className="text-lg text-muted-foreground">
              Web Development Student | AI-Native Full-Stack Developer
            </p>
            <p className="text-base leading-relaxed max-w-2xl">
              I&apos;m a passionate web development student building modern, responsive applications using Next.js, React, and Tailwind CSS. I&apos;m dedicated to learning AI-assisted development workflows and creating seamless user experiences through full-stack development.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="https://avatars.githubusercontent.com/cococma"
              alt="Cole Abraham"
              width={150}
              height={150}
              className="rounded-lg border border-border shadow-md"
            />
          </div>
        </div>
      </section>

      <SkillsGrid />
    </div>
  );
}

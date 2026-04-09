'use client';

import React from 'react';
import {
  Code,
  Cpu,
  Database,
  Layout,
  Server,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const skills: Skill[] = [
  {
    name: 'TypeScript',
    category: 'Language',
    icon: Code,
  },
  {
    name: 'React',
    category: 'Framework',
    icon: Zap,
  },
  {
    name: 'Next.js',
    category: 'Framework',
    icon: Layout,
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    icon: Cpu,
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: Server,
  },
  {
    name: 'SQL / Databases',
    category: 'Data',
    icon: Database,
  },
];

export function SkillsGrid() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className={cn(
                'rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent'
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {skill.category}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

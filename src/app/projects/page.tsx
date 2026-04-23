import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectStatus = "active" | "completed" | "archived";

interface Project {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
}

const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
};

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A collection of projects tracked in the dashboard.
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load projects: {error.message}
        </div>
      )}

      {!error && (!projects || projects.length === 0) && (
        <p className="text-sm text-muted-foreground">No projects found.</p>
      )}

      {projects && projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(projects as Project[]).map((project) => {
            const badgeClass =
              statusStyles[project.status] ?? statusStyles.archived;

            return (
              <Card key={project.id} className="transition-colors hover:bg-accent/50">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold leading-snug">
                      {project.title}
                    </CardTitle>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badgeClass}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  {project.description && (
                    <CardDescription>{project.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

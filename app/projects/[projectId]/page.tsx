import { getProject } from "@/lib/api/projects";
import { getTasksByProject } from "@/lib/api/tasks";
import { TaskList } from "@/components/tasks/TaskList";
import { UpdateProjectModal } from "@/components/projects/UpdateProjectModal";
import { DeleteProjectButton } from "@/components/projects/DeleteProjectButton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/dateUtils";
import { Calendar, Clock, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Project Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Created {formatDate(project.createdAt)}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Updated {formatDate(project.updatedAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <UpdateProjectModal project={project} />
            <DeleteProjectButton projectId={project._id} />
          </div>
        </div>

        {/* Project Status and Description */}
        <div className="flex items-center space-x-4">
          <StatusBadge status={project.status} />
          {project.description && (
            <div className="flex items-center text-muted-foreground">
              <FileText className="mr-2 h-4 w-4" />
              <p className="text-sm">{project.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <div className="text-sm text-muted-foreground">
            {project.taskCount || 0} tasks
          </div>
        </div>

        <Suspense fallback={<TasksLoadingSkeleton />}>
          <TasksSection projectId={projectId} />
        </Suspense>
      </Card>
    </div>
  );
}

async function TasksSection({ projectId }: { projectId: string }) {
  const tasks = await getTasksByProject(projectId);
  return <TaskList tasks={tasks} projectId={projectId} />;
}

function TasksLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
import { getProjects } from "@/lib/api/projects";
import { ProjectsTable } from "@/components/projects/ProjectsTable";


export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto py-8">
      <ProjectsTable projects={projects} />
    </main>
  )
}

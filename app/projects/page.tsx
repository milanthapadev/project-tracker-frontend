"use client";

import { getProjects } from "@/lib/api/projects";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = () => {
    fetchProjects();
  };

  const handleProjectUpdated = () => {
    fetchProjects();
  };

  const handleProjectDeleted = () => {
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProjectsTable 
        projects={projects} 
        onProjectAdded={handleProjectAdded}
        onProjectUpdated={handleProjectUpdated}
        onProjectDeleted={handleProjectDeleted}
      />
    </div>
  );
} 
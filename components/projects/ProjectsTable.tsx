"use client";

import { Project } from "@/types/project";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getColorByLetter } from "@/lib/colorMap";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";
import { AddProjectModal } from "./AddProjectModal";
import { UpdateProjectModal } from "./UpdateProjectModal";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { useState, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectsTableProps {
  projects: Project[];
  onProjectAdded?: () => void;
  onProjectUpdated?: () => void;
  onProjectDeleted?: () => void;
}

export function ProjectsTable({ 
  projects, 
  onProjectAdded,
  onProjectUpdated,
  onProjectDeleted 
}: ProjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(query) ||
      (project.description && project.description.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">No projects found</p>
        <div className="mt-4">
          <AddProjectModal onProjectAdded={onProjectAdded} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <AddProjectModal onProjectAdded={onProjectAdded} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Project
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Tasks
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => {
              const initial = project.title.charAt(0).toUpperCase();
              const colorClass = getColorByLetter(initial);

              return (
                <tr
                  key={project._id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/projects/${project._id}`}
                      className="flex items-center min-w-[200px]"
                    >
                      <div className="flex items-center min-w-[200px]">
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center ${colorClass}`}
                        >
                          <span className="font-medium text-lg">{initial}</span>
                        </div>
                        <div className="ml-4 overflow-hidden">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="font-medium truncate max-w-[180px]">
                                  {project.title}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>{project.title}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {project.description && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="text-sm text-gray-500 mt-1 truncate max-w-[180px]">
                                    {project.description}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {project.description}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.taskCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(project.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <UpdateProjectModal 
                        project={project} 
                        onProjectUpdated={onProjectUpdated} 
                      />
                      <DeleteProjectButton 
                        projectId={project._id} 
                        onProjectDeleted={onProjectDeleted} 
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { Project, ProjectCreate } from "@/types/project";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/projects';

/**
 * Fetch all projects
 */
export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const { data } = await response.json(); // Destructure data from response
  return data; // Return just the projects array
};

/**
 * Fetch single project by ID
 */
export const getProject = async (projectId: string): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  const { data } = await response.json();
  return data;
};

/**
 * Create new project
 */
export const createProject = async (projectData: ProjectCreate): Promise<Project> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
};

/**
 * Update existing project
 */
export const updateProject = async (id: string, projectData: Partial<ProjectCreate>): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  return response.json();
};

/**
 * Delete project
 */
export const deleteProject = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
};
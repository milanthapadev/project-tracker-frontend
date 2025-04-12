// types/project.d.ts
export interface Project {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  // Add task count if needed
  taskCount?: number;
  status: 'open' | 'completed' | 'archived';
}

export type ProjectCreate = {
  title: string;
  description?: string;
  status?: 'open' | 'completed' | 'archived';
};
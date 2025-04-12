export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTask {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  projectId: string;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
}
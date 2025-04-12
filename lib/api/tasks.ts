import { Task, CreateTask } from "@/types/task";
import {TaskStatus} from "@/types/status"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch all tasks
 */
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

/**
 * Fetch tasks for specific project
 */
export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/project/${projectId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const { data } = await response.json();
    return Array.isArray(data) ? data : []; // Double-check array type
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return []; // Graceful fallback
  }
};

/**
 * Fetch single task by ID
 */
export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
};

/**
 * Create new task
 */
export const createTask = async (taskData: CreateTask): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...taskData,
      status: taskData.status || 'todo' // Default status
    })
  });
  const { data } = await response.json();
  return data;
};

/**
 * Update existing task
 */
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

/**
 * Update task status
 */
export const updateTaskStatus = async (taskId: string, status: TaskStatus): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task status');
  }
  
  const { data } = await response.json();
  return data;
};

/**
 * Delete task
 */
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
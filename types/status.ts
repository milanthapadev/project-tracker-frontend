export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ProjectStatus = 'open' | 'completed' | 'archived';
export type AppStatus = TaskStatus | ProjectStatus;

export const STATUS_STYLES: Record<AppStatus, string> = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'done': 'bg-green-100 text-green-800',
  'open': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-green-100 text-green-800',
  'archived': 'bg-purple-100 text-purple-800'
};

export const STATUS_LABELS: Record<AppStatus, string> = {
  'todo': 'Todo',
  'in-progress': 'In Progress',
  'done': 'Done',
  'open': 'Open',
  'completed': 'Completed',
  'archived': 'Archived'
};
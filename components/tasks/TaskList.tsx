"use client";

import { Task } from "@/types/task";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AddTaskModal } from "./AddTaskModal";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTaskStatus, getTasksByProject } from "@/lib/api/tasks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[];
  projectId: string;
}

export function TaskList({ tasks: initialTasks, projectId }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const fetchTasks = async () => {
    try {
      const updatedTasks = await getTasksByProject(projectId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to refresh tasks");
    }
  };

  const handleTaskAdded = async () => {
    await fetchTasks();
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
  };

  const handleTaskDeleted = async () => {
    await fetchTasks();
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    const originalStatus = tasks.find(t => t._id === taskId)?.status;
    
    try {
      // Optimistic update
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
      
      await updateTaskStatus(taskId, newStatus);
      toast.success("Task status updated");
    } catch (error) {
      // Revert on error
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: originalStatus! } : task
      ));
      toast.error("Failed to update status");
      console.error("Status update error:", error);
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="space-y-2">
          <p className="text-lg font-medium text-muted-foreground">No tasks yet</p>
          <p className="text-sm text-muted-foreground">Get started by creating your first task</p>
          <div className="pt-4">
            <AddTaskModal projectId={projectId} onTaskAdded={handleTaskAdded} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddTaskModal projectId={projectId} onTaskAdded={handleTaskAdded} />
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <Card key={task._id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => handleStatusChange(task._id, task.status === 'done' ? 'todo' : 'done')}
                  className="flex-shrink-0"
                >
                  {getStatusIcon(task.status)}
                </button>
                <div className="min-w-0 flex-1">
                  <div className={cn(
                    "text-sm font-medium",
                    task.status === 'done' && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Select
                  value={task.status}
                  onValueChange={(value) => 
                    handleStatusChange(task._id, value as Task['status'])
                  }
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue>
                      <StatusBadge status={task.status} />
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">
                      <StatusBadge status="todo" />
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <StatusBadge status="in-progress" />
                    </SelectItem>
                    <SelectItem value="done">
                      <StatusBadge status="done" />
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-1">
                  <UpdateTaskModal task={task} onTaskUpdated={handleTaskUpdated} />
                  <DeleteTaskButton taskId={task._id} onTaskDeleted={handleTaskDeleted} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
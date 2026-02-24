import axios from 'axios';
import { TravelTask, TaskFormData } from './types';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5107/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Fetch all tasks
  getAllTasks: async (): Promise<TravelTask[]> => {
    const response = await apiClient.get<TravelTask[]>('/tasks');
    return response.data;
  },

  // Fetch a single task by ID
  getTaskById: async (id: number): Promise<TravelTask> => {
    const response = await apiClient.get<TravelTask>(`/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (data: TaskFormData): Promise<TravelTask> => {
    const response = await apiClient.post<TravelTask>('/tasks', {
      ...data,
      date: new Date().toISOString(),
      isCompleted: false,
    });
    return response.data;
  },

  // Update an existing task
  updateTask: async (id: number, data: TravelTask): Promise<void> => {
    await apiClient.put(`/tasks/${id}`, data);
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  // Toggle task completion status
  toggleTaskCompletion: async (id: number, currentTask: TravelTask): Promise<void> => {
    await apiClient.put(`/tasks/${id}`, {
      ...currentTask,
      isCompleted: !currentTask.isCompleted,
    });
  },
};

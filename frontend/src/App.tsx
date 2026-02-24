import React, { useState, useEffect } from 'react';
import { TravelTask, TaskFormData } from './types';
import { taskApi } from './api/taskApi';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import styles from './App.module.css';

function App() {
  const [tasks, setTasks] = useState<TravelTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load tasks';
      setError(errorMessage);
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (formData: TaskFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const newTask = await taskApi.createTask(formData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add task';
      setError(errorMessage);
      console.error('Error adding task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      console.error('Error deleting task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id: number, task: TravelTask) => {
    try {
      setIsLoading(true);
      setError(null);
      await taskApi.toggleTaskCompletion(id, task);
      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      console.error('Error toggling task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>✈️ Travel Task Manager</h1>
        <p>Manage your travel tasks efficiently</p>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.errorBox} data-testid="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <TaskForm onSubmit={handleAddTask} isLoading={isLoading} />

        <section className={styles.tasksSection}>
          <h2>Tasks ({tasks.length})</h2>
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

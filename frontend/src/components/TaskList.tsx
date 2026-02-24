import React from 'react';
import { TravelTask } from '../types';
import { TaskItem } from './TaskItem';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: TravelTask[];
  onToggleComplete: (id: number, task: TravelTask) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  isLoading = false,
}) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState} data-testid="empty-state">
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList} data-testid="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

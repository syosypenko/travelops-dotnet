import React from 'react';
import { TravelTask } from '../types';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: TravelTask;
  onToggleComplete: (id: number, task: TravelTask) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  isLoading = false,
}) => {
  return (
    <div
      className={`${styles.taskItem} ${task.isCompleted ? styles.completed : ''}`}
      data-testid={`task-item-${task.id}`}
    >
      <div className={styles.taskContent}>
        <h3 data-testid={`task-title-${task.id}`}>{task.title}</h3>
        {task.description && (
          <p data-testid={`task-description-${task.id}`}>{task.description}</p>
        )}
        <small className={styles.date}>
          {new Date(task.date).toLocaleDateString()}
        </small>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => onToggleComplete(task.id, task)}
          disabled={isLoading}
          data-testid={`task-toggle-${task.id}`}
          className={styles.toggleButton}
        >
          {task.isCompleted ? '✓ Done' : 'Mark Done'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          disabled={isLoading}
          data-testid={`task-delete-${task.id}`}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

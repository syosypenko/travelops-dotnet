import React, { useState } from 'react';
import { TaskFormData } from '../types';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (description.trim().length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="task-form">
      <div className={styles.formGroup}>
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          type="text"
          placeholder="e.g., Book Flight to Vienna"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          data-testid="task-title-input"
          className={errors.title ? styles.inputError : ''}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Add details about this task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          data-testid="task-description-input"
          className={errors.description ? styles.inputError : ''}
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        data-testid="task-submit-button"
        className={styles.submitButton}
      >
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

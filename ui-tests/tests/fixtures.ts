// fixtures.ts - Test data and utilities
import { test as base, expect } from '@playwright/test';

export interface TestContext {
  apiBaseUrl: string;
  cleanupTasks: number[];
}

export const test = base.extend<TestContext>({
  apiBaseUrl: async ({}, use) => {
    await use('http://localhost:5107/api');
  },
  cleanupTasks: async ({}, use) => {
    const cleanup: number[] = [];
    await use(cleanup);

    // Cleanup: Delete created tasks
    for (const taskId of cleanup) {
      try {
        await fetch(`http://localhost:5107/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(`Failed to cleanup task ${taskId}:`, error);
      }
    }
  },
});

export { expect };

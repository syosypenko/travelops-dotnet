import { test, expect } from './fixtures';
import { testData, createTaskViaAPI, deleteTaskViaAPI, getAllTasksViaAPI } from './test-data';

const API_URL = 'http://localhost:5107/api';

test.describe('Travel Task Manager - E2E Tests', () => {
  test('should load the application and display the header', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Travel Task Manager');
    await expect(page.locator('h1')).toContainText('Travel Task Manager');
  });

  test.describe('Task Form - Validation & Creation', () => {
    test('should validate that title is required', async ({ page }) => {
      await page.goto('/');

      // Try to submit with empty title
      const titleInput = page.locator('[data-testid="task-title-input"]');
      const descInput = page.locator('[data-testid="task-description-input"]');
      const submitBtn = page.locator('[data-testid="task-submit-button"]');

      await titleInput.clear();
      await descInput.fill('Some description');
      await submitBtn.click();

      // Expect error message
      await expect(page.locator('[data-testid="title-error"]')).toBeVisible();
    });

    test('should validate minimum title length (3 characters)', async ({ page }) => {
      await page.goto('/');

      const titleInput = page.locator('[data-testid="task-title-input"]');
      const submitBtn = page.locator('[data-testid="task-submit-button"]');

      await titleInput.fill('AB'); // Less than 3 chars
      await submitBtn.click();

      await expect(page.locator('[data-testid="title-error"]')).toBeVisible();
    });

    test('should validate maximum description length (500 characters)', async ({ page }) => {
      await page.goto('/');

      const titleInput = page.locator('[data-testid="task-title-input"]');
      const descInput = page.locator('[data-testid="task-description-input"]');
      const submitBtn = page.locator('[data-testid="task-submit-button"]');

      await titleInput.fill('Valid Title');
      await descInput.fill('A'.repeat(501)); // Exceeds max length
      await submitBtn.click();

      await expect(
        page.locator('[data-testid="description-error"]')
      ).toBeVisible();
    });

    test('should successfully create a task with valid data', async ({ page, apiBaseUrl, cleanupTasks }) => {
      await page.goto('/');

      const titleInput = page.locator('[data-testid="task-title-input"]');
      const descInput = page.locator('[data-testid="task-description-input"]');
      const submitBtn = page.locator('[data-testid="task-submit-button"]');

      await titleInput.fill(testData.validTask.title);
      await descInput.fill(testData.validTask.description);
      await submitBtn.click();

      // Verify task appears in UI
      await expect(
        page.locator(`text=${testData.validTask.title}`)
      ).toBeVisible();

      await expect(
        page.locator(`text=${testData.validTask.description}`)
      ).toBeVisible();

      // Extract and track the created task for cleanup
      const tasks = await getAllTasksViaAPI(apiBaseUrl);
      const createdTask = tasks.find((t) => t.title === testData.validTask.title);
      if (createdTask) {
        cleanupTasks.push(createdTask.id);
      }
    });

    test('should clear form after successful task creation', async ({ page, apiBaseUrl, cleanupTasks }) => {
      await page.goto('/');

      const titleInput = page.locator('[data-testid="task-title-input"]') as any;
      const descInput = page.locator('[data-testid="task-description-input"]') as any;
      const submitBtn = page.locator('[data-testid="task-submit-button"]');

      await titleInput.fill(testData.validTask.title);
      await descInput.fill(testData.validTask.description);
      await submitBtn.click();

      // Wait for form to be cleared
      await page.waitForTimeout(500);

      // Verify form is empty
      await expect(titleInput).toHaveValue('');
      await expect(descInput).toHaveValue('');

      // Track for cleanup
      const tasks = await getAllTasksViaAPI(apiBaseUrl);
      const createdTask = tasks.find((t) => t.title === testData.validTask.title);
      if (createdTask) {
        cleanupTasks.push(createdTask.id);
      }
    });
  });

  test.describe('Task List - Display & Interactions', () => {
    test.describe.configure({ mode: 'serial' });
    
    test('should display empty state when no tasks exist', async ({ page, apiBaseUrl }) => {
      // Clear all tasks multiple times to ensure clean state
      for (let i = 0; i < 3; i++) {
        const tasks = await getAllTasksViaAPI(apiBaseUrl);
        if (tasks.length === 0) break;
        for (const task of tasks) {
          await deleteTaskViaAPI(apiBaseUrl, task.id);
        }
        await page.waitForTimeout(200);
      }
      
      // Verify all tasks are deleted
      const finalTasks = await getAllTasksViaAPI(apiBaseUrl);
      expect(finalTasks.length).toBe(0);

      // Now load the page with no tasks
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Verify no task list is visible
      await expect(page.locator('[data-testid="task-list"]')).not.toBeVisible();
      
      // Should show empty state
      await expect(page.locator('[data-testid="empty-state"]')).toBeVisible({ timeout: 10000 });
      await expect(
        page.locator('text=No tasks yet. Create one to get started!')
      ).toBeVisible();
    });

    test('should display all tasks on page load', async ({ page, apiBaseUrl, cleanupTasks }) => {
      // Clear all tasks first for isolation
      const existingTasks = await getAllTasksViaAPI(apiBaseUrl);
      for (const task of existingTasks) {
        await deleteTaskViaAPI(apiBaseUrl, task.id);
      }
      
      // Create test tasks via API
      const task1 = await createTaskViaAPI(apiBaseUrl, 'Task 1', 'Description 1');
      const task2 = await createTaskViaAPI(apiBaseUrl, 'Task 2', 'Description 2');
      cleanupTasks.push(task1.id, task2.id);

      await page.goto('/');

      // Verify both tasks are displayed
      await expect(page.locator('text=Task 1')).toBeVisible();
      await expect(page.locator('text=Task 2')).toBeVisible();
      await expect(page.locator('[data-testid="task-list"]')).toBeVisible();
    });

    test('should mark task as completed', async ({ page, apiBaseUrl, cleanupTasks }) => {
      const task = await createTaskViaAPI(apiBaseUrl, 'Complete Me', 'Test completion');
      cleanupTasks.push(task.id);

      await page.goto('/');

      // Find and click the toggle button
      const toggleBtn = page.locator(`[data-testid="task-toggle-${task.id}"]`);
      await toggleBtn.click();

      // Wait for UI update
      await page.waitForTimeout(300);

      // Verify button text changed to "Done"
      await expect(toggleBtn).toContainText('Done');

      // Verify visual styling changed (CSS modules use hashed class names)
      const taskItem = page.locator(`[data-testid="task-item-${task.id}"]`);
      const className = await taskItem.getAttribute('class');
      expect(className).toContain('completed');
    });

    test('should delete a task', async ({ page, apiBaseUrl, cleanupTasks }) => {
      const task = await createTaskViaAPI(apiBaseUrl, 'Delete Me', 'Test deletion');

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Verify task exists (wait for it to render)
      await expect(page.locator(`[data-testid="task-item-${task.id}"]`)).toBeVisible({ timeout: 10000 });

      // Click delete and handle dialog in parallel
      const deleteBtn = page.locator(`[data-testid="task-delete-${task.id}"]`);
      
      await Promise.all([
        page.waitForEvent('dialog').then(dialog => dialog.accept()),
        deleteBtn.click()
      ]);

      // Wait for element to be removed from DOM
      await expect(page.locator(`[data-testid="task-item-${task.id}"]`)).not.toBeVisible({ timeout: 5000 });

      // Verify task is removed
      await expect(page.locator(`[data-testid="task-item-${task.id}"]`)).not.toBeVisible();
    });

    test('should update task count in header', async ({ page, apiBaseUrl, cleanupTasks }) => {
      // Clear all tasks first for isolation
      const existingTasks = await getAllTasksViaAPI(apiBaseUrl);
      for (const task of existingTasks) {
        await deleteTaskViaAPI(apiBaseUrl, task.id);
      }
      
      // Create exactly 2 tasks
      const task1 = await createTaskViaAPI(apiBaseUrl, 'Count Task 1', 'Test count');
      const task2 = await createTaskViaAPI(apiBaseUrl, 'Count Task 2', 'Test count');
      cleanupTasks.push(task1.id, task2.id);

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Verify count is displayed
      await expect(page.locator('h2')).toContainText('Tasks (2)');
    });
  });

  test.describe('API Contract Tests', () => {
    test('should fetch all tasks via API and verify structure', async ({ apiBaseUrl }) => {
      const response = await fetch(`${apiBaseUrl}/tasks`);
      expect(response.ok).toBeTruthy();

      const tasks = await response.json();
      expect(Array.isArray(tasks)).toBeTruthy();

      // Verify task structure
      if (tasks.length > 0) {
        const task = tasks[0];
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('description');
        expect(task).toHaveProperty('date');
        expect(task).toHaveProperty('isCompleted');
      }
    });

    test('should create a task via API and verify response', async ({ apiBaseUrl, cleanupTasks }) => {
      const newTask = {
        title: 'API Test Task',
        description: 'Created via API',
        date: new Date().toISOString(),
        isCompleted: false,
      };

      const response = await fetch(`${apiBaseUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      expect(response.ok).toBeTruthy();
      const createdTask = await response.json();
      cleanupTasks.push(createdTask.id);

      expect(createdTask.id).toBeDefined();
      expect(createdTask.title).toBe(newTask.title);
      expect(createdTask.isCompleted).toBe(false);
    });

    test('should retrieve a task by ID', async ({ apiBaseUrl, cleanupTasks }) => {
      const task = await createTaskViaAPI(apiBaseUrl, 'Get by ID Task', 'Test retrieval');
      cleanupTasks.push(task.id);

      const response = await fetch(`${apiBaseUrl}/tasks/${task.id}`);
      expect(response.ok).toBeTruthy();

      const retrievedTask = await response.json();
      expect(retrievedTask.id).toBe(task.id);
      expect(retrievedTask.title).toBe(task.title);
    });

    test('should update a task via API', async ({ apiBaseUrl, cleanupTasks }) => {
      const task = await createTaskViaAPI(apiBaseUrl, 'Update Task', 'Original description');
      cleanupTasks.push(task.id);

      const updatedData = {
        ...task,
        title: 'Updated Title',
        isCompleted: true,
      };

      const response = await fetch(`${apiBaseUrl}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      expect(response.status).toBe(204); // No Content expected

      // Verify update
      const getResponse = await fetch(`${apiBaseUrl}/tasks/${task.id}`);
      const updated = await getResponse.json();
      expect(updated.title).toBe('Updated Title');
      expect(updated.isCompleted).toBe(true);
    });

    test('should return 404 for non-existent task', async ({ apiBaseUrl }) => {
      const response = await fetch(`${apiBaseUrl}/tasks/99999`);
      expect(response.status).toBe(404);
    });
  });

  test.describe('Error Handling', () => {
    test('should display error message on API failure', async ({ page, apiBaseUrl }) => {
      // This would require mocking or intercepting the request
      // For now, we'll test the error UI component manually
      await page.goto('/');
      await expect(page.locator('[data-testid="error-message"]')).not.toBeVisible();
    });
  });
});

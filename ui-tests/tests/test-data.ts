// test-data.ts - Test data and helper functions
export const testData = {
  validTask: {
    title: 'Book Flight to Vienna',
    description: 'Austrian Airlines departing at 10:00 AM',
  },
  taskWithLongDescription: {
    title: 'Hotel Booking',
    description: 'A'.repeat(500), // Max length
  },
  taskWithExcessiveDescription: {
    title: 'Long Description Task',
    description: 'A'.repeat(501), // Over max length
  },
  shortTitleTask: {
    title: 'AB', // Too short
    description: 'This title is too short',
  },
  emptyTitleTask: {
    title: '',
    description: 'Description without title',
  },
};

export async function createTaskViaAPI(
  baseUrl: string,
  title: string,
  description: string
): Promise<{ id: number; title: string; description: string }> {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      date: new Date().toISOString(),
      isCompleted: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteTaskViaAPI(baseUrl: string, taskId: number): Promise<void> {
  const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.statusText}`);
  }
}

export async function getAllTasksViaAPI(baseUrl: string): Promise<any[]> {
  const response = await fetch(`${baseUrl}/tasks`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  return response.json();
}

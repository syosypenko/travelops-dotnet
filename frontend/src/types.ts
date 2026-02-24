export interface TravelTask {
  id: number;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}

export interface TaskFormData {
  title: string;
  description: string;
}

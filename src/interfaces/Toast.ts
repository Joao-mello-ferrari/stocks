export interface Toast{
  id: string;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
}
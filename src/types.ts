export interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
  members: string;
  days: string[];
  type: 'weekly' | 'monthly' | 'once';
  layout?: string;
}
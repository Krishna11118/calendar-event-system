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

export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface NavigationItem {
  name: string;
  icon: any;
  current: boolean;
  badge?: number;
  shortcut?: string;
  listIcon?: any;
  onClick?: () => void;
}
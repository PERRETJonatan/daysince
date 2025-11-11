import { Injectable } from '@angular/core';

export interface DaysSinceEvent {
  id: number;
  name: string;
  startDate: Date;
  description?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'daysince-events';
  public events: DaysSinceEvent[] = [];

  constructor() {
    this.loadEvents();
  }

  private loadEvents(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.events = JSON.parse(stored).map((e: any) => ({
        ...e,
        startDate: new Date(e.startDate),
      }));
    } else {
      // Initialize with sample habit-tracking events
      this.events = [];
      this.saveEvents();
    }
  }

  private saveEvents(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.events));
  }

  public getEvents(): DaysSinceEvent[] {
    return this.events.sort(
      (a, b) => b.startDate.getTime() - a.startDate.getTime()
    );
  }

  public getEventById(id: number): DaysSinceEvent | undefined {
    return this.events.find((e) => e.id === id);
  }

  public addEvent(event: Omit<DaysSinceEvent, 'id'>): void {
    const newEvent = {
      ...event,
      id:
        this.events.length > 0
          ? Math.max(...this.events.map((e) => e.id)) + 1
          : 1,
    };
    this.events.push(newEvent);
    this.saveEvents();
  }

  public updateEvent(id: number, updates: Partial<DaysSinceEvent>): void {
    const index = this.events.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...updates };
      this.saveEvents();
    }
  }

  public deleteEvent(id: number): void {
    this.events = this.events.filter((e) => e.id !== id);
    this.saveEvents();
  }

  public calculateDaysSince(startDate: Date): number {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  public calculateDetailedTime(startDate: Date): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
}

import { Component, inject } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, DaysSinceEvent } from '../services/data.service';
import { addIcons } from 'ionicons';
import { add, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    MessageComponent,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
})
export class HomePage {
  private data = inject(DataService);
  private alertController = inject(AlertController);

  constructor() {
    addIcons({ add, trashOutline });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 1000);
  }

  getEvents(): DaysSinceEvent[] {
    return this.data.getEvents();
  }

  getDaysSince(startDate: Date): number {
    return this.data.calculateDaysSince(startDate);
  }

  async addNewEvent() {
    const now = new Date();
    const alert = await this.alertController.create({
      header: 'Track New Habit',
      message: 'What did you quit?',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'e.g., "Smoking", "Drinking", "Sugar"',
          attributes: {
            required: true,
          },
        },
        {
          name: 'date',
          type: 'date',
          value: now.toISOString().split('T')[0],
          attributes: {
            required: true,
          },
        },
        {
          name: 'time',
          type: 'time',
          value: now.toTimeString().slice(0, 5),
          attributes: {
            required: true,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Why did you quit? (optional)',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Start Tracking',
          handler: (data) => {
            if (data.name && data.date && data.time) {
              // Combine date and time
              const dateTime = new Date(`${data.date}T${data.time}`);
              this.data.addEvent({
                name: data.name,
                startDate: dateTime,
                description: data.description || '',
                color: this.getRandomColor(),
              });
              return true;
            }
            return false;
          },
        },
      ],
    });

    await alert.present();
  }

  private getRandomColor(): string {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'danger',
      'medium',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

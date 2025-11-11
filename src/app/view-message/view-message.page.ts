import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Platform,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  timeOutline,
  trashOutline,
  refreshOutline,
} from 'ionicons/icons';
import { DataService, DaysSinceEvent } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonButton,
  ],
})
export class ViewMessagePage implements OnInit, OnDestroy {
  public event?: DaysSinceEvent;
  public timeDetails = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private intervalId?: number;

  constructor() {
    addIcons({ calendarOutline, timeOutline, trashOutline, refreshOutline });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.event = this.data.getEventById(parseInt(id, 10));

    if (this.event) {
      this.updateTime();
      this.intervalId = window.setInterval(() => {
        this.updateTime();
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime() {
    if (this.event) {
      this.timeDetails = this.data.calculateDetailedTime(this.event.startDate);
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }

  formatDate(date: Date): string {
    return (
      date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      ' at ' +
      date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    );
  }

  async deleteEvent() {
    if (!this.event) return;

    const alert = await this.alertController.create({
      header: 'Delete Event',
      message: `Are you sure you want to delete "${this.event.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            if (this.event) {
              this.data.deleteEvent(this.event.id);
              this.router.navigate(['/']);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async resetEvent() {
    if (!this.event) return;

    const alert = await this.alertController.create({
      header: 'Reset Tracker',
      message: `Are you sure you want to reset "${this.event.name}"? This will set the start date to now and you'll lose your current progress.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset',
          role: 'destructive',
          handler: () => {
            if (this.event) {
              this.data.updateEvent(this.event.id, {
                startDate: new Date(),
              });
              // Reload the event data
              this.event = this.data.getEventById(this.event.id);
              this.updateTime();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}

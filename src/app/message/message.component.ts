import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Platform,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward, calendarOutline } from 'ionicons/icons';
import { DaysSinceEvent } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IonItem, IonLabel, IonIcon, IonBadge],
})
export class MessageComponent {
  private platform = inject(Platform);
  @Input() event?: DaysSinceEvent;
  @Input() daysSince?: number;

  isIos() {
    return this.platform.is('ios');
  }

  constructor() {
    addIcons({ chevronForward, calendarOutline });
  }

  formatDate(date: Date): string {
    return (
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) +
      ' at ' +
      date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    );
  }
}

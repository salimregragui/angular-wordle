import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Notification } from 'src/utils/notification';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit, AfterViewInit {
  @Input()
  notification: Notification;

  @Input()
  notificationIndex: number;

  @Output() removeNotification: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.removeNotificationHandler();
    }, 1500);
  }

  removeNotificationHandler(): void {
    this.removeNotification.emit(this.notificationIndex);
  }
}

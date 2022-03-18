import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notification } from 'src/utils/notification';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private noticationService: NotificationsService) {}

  ngOnInit(): void {
    this.noticationService
      .getNotifications()
      .subscribe((notifications) => (this.notifications = notifications));
  }

  removeNotification(event: number): void {
    this.noticationService.removeNotification(event);
  }
}

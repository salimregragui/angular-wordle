import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Notification } from 'src/utils/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notications: Notification[] = [];
  notificationsSubject: Subject<Notification[]> = new BehaviorSubject<
    Notification[]
  >([]);

  constructor() {}

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  addNotification(notification: Notification): void {
    this.notications.push(notification);
    this.notificationsSubject.next([...this.notications]);
  }

  removeNotification(index: number): void {
    this.notications.splice(index, 1);

    this.notificationsSubject.next(this.notications);
  }
}

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


/**
 * UserService manages our current user
 */
@Injectable()
export class UsersService {
  // `currentUser` contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);
  // However, the first value of this stream is null (the constructor argument)

  constructor() {
    console.log('UsersService starts work!');
  }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [
  UsersService
];






// Briefly, two benefits of dependency - injection are:
// 1 we let Angular handle the lifecycle of the object and
// 2 it’s easier to test injected components.


// BehaviourSubject84 has a special property in that it stores the last value.Meaning that any
// subscriber to the stream will receive the latest value.This is great for us because it means that any
// part of our application can subscribe to the UsersService.currentUser stream and immediately
// know who the current user is.
import { uuid } from '../util/uuid';

/**
 * A User represents an agent that sends messages
 */
export class User {
  id: string;

  constructor(public name: string,
              public avatarSrc: string) {
    this.id = uuid();
  }
}


// 在ts constructor (public name: string) 这样写 等效于
// 1. 使 name 为这个class 的public属性
// 2. assign the argument value to that property when a new instance is created.

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input()
  public userlist: Array<User>;

  @Input()
  public isRevealed: boolean;

  @Output()
  public userItemClicked = new EventEmitter<string>();

  onItemClick(evt: Event, username: string) {
    evt.preventDefault();
    this.userItemClicked.emit(username);
  }

}

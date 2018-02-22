import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input()
  public userlist: Array<Object>;

  @Input()
  public isRevealed: boolean;

  @Output()
  public userItemClicked = new EventEmitter<string>();

  onItemClick(evt: Event, username: string) {
    evt.preventDefault();
    console.log(username);
    this.userItemClicked.emit(username);
  }

}

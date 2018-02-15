import { Component, Input } from '@angular/core';

import { User } from '../../models/User';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

  @Input()
  public user: User;

  @Input()
  public isRevealed: boolean;

}

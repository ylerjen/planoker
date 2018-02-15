import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poker-card',
  templateUrl: './poker-card.component.html',
  styleUrls: ['./poker-card.component.scss']
})
export class PokerCardComponent {

  @Input()
  public value: string;

  @Input()
  public isFlipped: boolean;

  @Input()
  public versoText: string;
}

import { Component, OnInit } from '@angular/core';

const conversionObj = {
  '?': '❓',
  '1': '1',
  '2': '2',
  '3': '3',
  '5': '5',
  '8': '8',
  '13': '13',
  '21': '21',
  '34': '34',
  '55': '55',
  'break': '☕',
};

@Component({
  selector: 'app-user-place-page',
  templateUrl: './user-place-page.component.html',
  styleUrls: ['./user-place-page.component.scss']
})
export class UserPlacePageComponent {

  public selectOptions = conversionObj;
  public selectedValue = conversionObj['?'];

  selectionChanged(evt: Event) {
    const selectEl = evt.target as HTMLSelectElement;
    this.selectedValue = conversionObj[selectEl.value];
  }
}

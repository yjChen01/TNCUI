import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shuttle-state',
  templateUrl: './shuttle-state.component.html',
  styleUrls: ['./shuttle-state.component.css'],
})
export class ShuttleStateComponent {
  @Input() shuttlestate: any;
  constructor() {}
  getlightClass(val: any) {
    if (val === 0 || val == 'false') return 'icon-red-to-gray';
    else return 'icon-green-to-gray';
  }

  transferstatetobool(par: number) {
    if (par == 0) return false;
    else return true;
  }
}

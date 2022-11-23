import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lift-state',
  templateUrl: './lift-state.component.html',
  styleUrls: ['./lift-state.component.css'],
})
export class LiftStateComponent {
  @Input() liftstate: any;

  constructor() {}

  getlightClass(val: number) {
    if (val === 0) return 'icon-red-to-gray';
    else return 'icon-green-to-gray';
  }

  transferstatetobool(par: number) {
    if (par == 0) return false;
    else return true;
  }
}

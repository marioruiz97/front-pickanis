import { NavItem } from '@core/model/nav-item';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter();

  @Input()
  menu!: NavItem[];

  constructor() {
    // void constructor
  }

  onToggle(): void {
    this.closeSidenav.emit();
  }
}

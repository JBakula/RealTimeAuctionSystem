import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

openMyMenu(menuTrigger: MatMenuTrigger) {
  menuTrigger.openMenu();
}

closeMyMenu(menuTrigger: MatMenuTrigger) {
  menuTrigger.closeMenu();
} 

}

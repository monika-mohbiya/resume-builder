import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-components',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule, MatSidenavModule, MatListModule, LoaderComponent, RouterOutlet],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {
  isMobile = false;
  constructor(private router: Router) { }
  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', () => {
      this.checkScreen();
    });
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
  }
  routeNav(path: string) {
    this.router.navigate([path]);
  }
}

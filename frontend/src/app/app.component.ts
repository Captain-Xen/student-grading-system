import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostBinding('class') activeThemeClass: string = '';

  toggleTheme(isDark: boolean) {
    this.activeThemeClass = isDark ? 'dark-theme' : '';
  }
}

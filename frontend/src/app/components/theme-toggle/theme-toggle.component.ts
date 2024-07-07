import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {

  toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
      body.classList.replace('light-theme', 'dark-theme');
    } else {
      body.classList.replace('dark-theme', 'light-theme');
    }
  }
}

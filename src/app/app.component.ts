import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-strength-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  password = '';

  colors: {
    easy: string[];
    medium: string[];
    strong: string[];
    default: string[];
    shortLength: string[];
  } = {
      easy: ['red', 'gray', 'gray'],
      medium: ['yellow', 'yellow', 'gray'],
      strong: ['green', 'green', 'green'],
      default: ['gray', 'gray', 'gray'],
      shortLength: ['red', 'red', 'red']
    };

  strengthColors = this.colors.default
  result = '';
  strength = 0;

  checkPasswordStrength() {
    const length = this.password.length;
    this.strength = 0


    if (length === 0) {
      this.resetStrenght();
      return;
    }

    if (length < 8) {
      this.strengthColors = this.colors.shortLength
      return;
    }

    this.checkDigits();
    this.checkLetters();
    this.checkSpecialCharacters();
    this.updateStrength();

  }

  resetStrenght() {
    this.strengthColors = this.colors.default
    this.result = ''
  }

  checkDigits() {
    if (/\d/.test(this.password)) {
      this.strength++
    }
  }

  checkLetters() {
    if (/[a-zA-Z]/.test(this.password)) {
      this.strength++;
    }
  }

  checkSpecialCharacters() {
    if (/[^0-9a-zA-Z]/.test(this.password)) {
      this.strength++;
    }
  }

  updateStrength(): void {
    switch (this.strength) {
      case 1:
        this.strengthColors = this.colors.easy;
        this.result = 'easy';
        break;
      case 2:
        this.strengthColors = this.colors.medium;
        this.result = 'medium';
        break;
      default:
        this.strengthColors = this.colors.strong;
        this.result = 'strong';
        break;
    }
  }
}

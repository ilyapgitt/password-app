import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  strengthColors: any;
  result = '';

  colors = {
    easy: ['red', 'gray', 'gray'],
    medium: ['yellow', 'yellow', 'gray'],
    strong: ['green', 'green', 'green'],
    default: ['gray', 'gray', 'gray'],
    shortLength: ['red', 'red', 'red']
  };

  constructor() { }

  checkPasswordStrength(value: string) {
    let strengthLevel = 0
    let length = value.length;

    if (length === 0) {
      this.resetStrength();
      return;
    }

    if (length < 8) {
      this.result = '';
      this.strengthColors = this.colors.shortLength
      return;
    }

    if (/\d/.test(value)) {
      strengthLevel++
    }

    if (/[a-zA-Z]/.test(value)) {
      strengthLevel++;
    }

    if (/[^0-9a-zA-Z]/.test(value)) {
      strengthLevel++;
    }


    switch (strengthLevel) {
      case 1:
        this.strengthColors = this.colors.easy;
        this.result = 'easy';
        break;
      case 2:
        this.strengthColors = this.colors.medium;
        this.result = 'medium';
        break;
      case 3:
        this.strengthColors = this.colors.strong;
        this.result = 'strong';
        break;
      default:
        break;
    }

  }

  resetStrength() {
    this.strengthColors = this.colors.default
    this.result = ''
  }

}

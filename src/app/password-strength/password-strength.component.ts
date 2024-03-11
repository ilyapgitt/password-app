import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthService } from '../password-strength.service';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="strength-indicator">
      <div class="strength" *ngFor="let color of passwordStrengthService.strengthColors" [ngStyle]="{ 'background-color': color, }"></div>
    </div>
  `,
  styleUrl: './password-strength.component.css'
})
export class PasswordStrengthComponent {
  constructor(public passwordStrengthService: PasswordStrengthService) {}
}

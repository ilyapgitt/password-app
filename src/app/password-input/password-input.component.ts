import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordStrengthService } from '../password-strength.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PasswordStrengthComponent } from "../password-strength/password-strength.component";

@Component({
    selector: 'app-password-input',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true
        }
    ],
    template: `
    <div >
      <p class="password-info">Password complexity: {{result}}</p>
    </div>

    <div class="password-input">
      <form [formGroup]="profileForm">
        <label for="password">
          Password:
          <br>
          <input
            type="password"
            id="value"
            [formControl]="passwordControl"
            placeholder="Enter your password"
            (input)="onInputChange($event)"
          />
        </label>
      </form>
    </div>

    <app-password-strength></app-password-strength>
  `,
    styleUrl: './password-input.component.css',
    imports: [ReactiveFormsModule, CommonModule, PasswordStrengthComponent]
})
export class PasswordInputComponent implements ControlValueAccessor {
  profileForm = new FormGroup({
    password: new FormControl('')
  })

  get passwordControl(): FormControl {
    return this.profileForm.get('password') as FormControl;
  }


  result: string = "";
  value: string = "";

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(public passwordStrengthService: PasswordStrengthService) {}
  writeValue(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.updateResult()
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onInputChange(event: any): void {
    this.writeValue(event.target.value)
  }

  updateResult(): void {
    if(this.value !== undefined) {
      this.passwordStrengthService.checkPasswordStrength(this.value);
      this.result = this.passwordStrengthService.result;
      this.onChange(this.value);
      this.onTouched();
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from "./password-input/password-input.component";
import { PasswordStrengthComponent } from "./password-strength/password-strength.component";

@Component({
    selector: 'app-strength-password',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        FormsModule,
        CommonModule,
        PasswordInputComponent,
        PasswordStrengthComponent,
    ]
})

export class AppComponent {

}

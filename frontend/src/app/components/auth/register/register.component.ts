import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordMismatch = false;

  private fb = inject(FormBuilder);
  public snackBar = inject(SnackbarService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValues = this.registerForm.value;
    this.authService.register(formValues).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.snackBar.showSuccessMessage('Sikeres regisztráció!', 'Close');
        }
      },
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null; // Return null if controls are not found
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData = {
    username: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSignup() {
    this.errorMessage = ''; // Reset error message
    this.successMessage = ''; // Reset success message
    const { username, email, password } = this.signupData;
    this.authService.signUp(username, email, password).subscribe({
      next: (response) => {
        this.successMessage = 'Signup successful! You can now log in.';
        this.router.navigate(['/login']);
        this.signupData = {
          username: '', email: '', password: ''
        };
      },
      error: (error) => {
        this.errorMessage = error.errors?.message || 'Signup failed! Please try again.';
      }
    });
  } 

}

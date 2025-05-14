import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/profile').subscribe({
      next: (response: any) => {
        this.userData = response;
      },
      error: (err: any) => {
        console.error('Error fetching user data:', err);
        this.errorMessage = 'Could not load profile data data.';
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

}

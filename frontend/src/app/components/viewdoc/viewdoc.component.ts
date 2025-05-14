import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewdoc',
  imports: [CommonModule, RouterModule],
  templateUrl: './viewdoc.component.html',
  styleUrl: './viewdoc.component.css'
})
export class ViewdocComponent implements OnInit {
  doctor: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      this.http.get(`http://localhost:3000/api/doctor/${doctorId}`).subscribe({
        next: (data) => {
          this.doctor = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching doctor:', err);
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/doctors']);
  }
}

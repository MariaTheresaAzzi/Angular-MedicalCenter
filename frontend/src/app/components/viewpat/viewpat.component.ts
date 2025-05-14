import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewpat',
  imports: [CommonModule, RouterModule],
  templateUrl: './viewpat.component.html',
  styleUrl: './viewpat.component.css'
})
export class ViewpatComponent  implements OnInit {
  patient: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  doctorName: string = '';

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.http.get(`http://localhost:3000/api/patient/${patientId}`).subscribe({
        next: (data) => {
          this.patient = data;
          this.loading = false;
          console.log('fetching patient:', data);

          if (this.patient.doctor) {
          this.http.get<any>(`http://localhost:3000/api/doctor/${this.patient.doctor}`).subscribe({
            next: (doctorData) => {
              this.doctorName = `${doctorData.firstname} ${doctorData.lastname}`;
              console.log('Doctor name:', this.doctorName);
            },
            error: (err) => {
              console.error('Error fetching doctor:', err);
            }
          });
        }
        },
        error: (err) => {
          console.error('Error fetching patient:', err);
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/patient']); // Replace with your route to navigate back to the patient list
  }
}

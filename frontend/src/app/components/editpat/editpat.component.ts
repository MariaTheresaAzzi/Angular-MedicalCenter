import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { Patient } from '../../models/patient.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editpat',
  imports: [RouterOutlet, CommonModule, RouterModule, FormsModule],
  templateUrl: './editpat.component.html',
  styleUrl: './editpat.component.css'
})

export class EditpatComponent implements OnInit { 
  patient: Patient = { firstname: '', lastname: '', email: '', address: '', date_of_birth: '', image: null, document: null, doctorId: '' };
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private http: HttpClient
  ) {}

  doctors: any[] = [];
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.doctorService.getDoctors().subscribe((doctorsData) => {
      this.doctors = doctorsData;

      if (this.id) {
        this.http.get(`http://localhost:3000/api/patient/${this.id}`).subscribe((data: any) => {
          // Format date_of_birth to 'YYYY-MM-DD'
          const formattedDate = data.date_of_birth
            ? data.date_of_birth.substring(0, 10) // trims "1990-01-01T00:00:00.000Z" to "1990-01-01"
            : '';

          this.patient = {
            ...data,
            doctorId: data.doctor,
            date_of_birth: formattedDate, // Set formatted date
          };
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.id) return;

    const formData = new FormData();

    // Append text fields
    formData.append('firstname', this.patient.firstname);
    formData.append('lastname', this.patient.lastname);
    formData.append('email', this.patient.email);
    formData.append('address', this.patient.address);
    formData.append('date_of_birth', this.patient.date_of_birth);
    formData.append('doctorId', this.patient.doctorId);

    if (this.patient.image && this.patient.image instanceof File) {
      formData.append('image', this.patient.image);
    }

    if (this.patient.document && this.patient.document instanceof File) {
      formData.append('document', this.patient.document);
    }

    this.http.put(`http://localhost:3000/api/patient/${this.id}`, formData).subscribe({
      next: () => this.router.navigate(['/patient', this.id]),
      error: (err) => console.error('Error updating patient:', err)
    });
  }

}

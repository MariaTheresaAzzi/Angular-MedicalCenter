import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-formpatient',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './formpatient.component.html',
  styleUrl: './formpatient.component.css'
})
export class FormpatientComponent {
  doctors: any[] = [];

  newPatient = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    date_of_birth: '',
    image: null,
    document: null,
    doctorId: ''
  };
    
  constructor(private http: HttpClient, private router: Router, private doctorService: DoctorService) {}

  ngOnInit() {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error('Failed to load doctors', err)
    });
  }

  onFileChange(event: any, field: 'image' | 'document') {
    const file = event.target.files[0];
    if (file) {
      this.newPatient[field] = file;
    }
  }

  // onSubmit() {
  //   const formData = new FormData();

  //   // Append all fields to FormData
  //   type NewPatientKey = keyof typeof this.newPatient;

  //   for (const key of Object.keys(this.newPatient) as NewPatientKey[]) {
  //     const value = this.newPatient[key];
  //     if (value !== null && value !== undefined) {
  //       formData.append(key, value as any);
  //     }
  //   }

  //   this.http.post('http://localhost:3000/api/createpatient', formData).subscribe(
  //     (res) => {
  //       this.newPatient = {
  //         firstname: '',
  //         lastname: '',
  //         email: '',
  //         address: '',
  //         date_of_birth: '',
  //         image: null,
  //         document: null,
  //         doctorId: ''
  //       };
  //       this.router.navigate(['/patient']);
  //     },
  //     (err) => {
  //       console.error('Error creating patient:', err);
  //     }
  //   );
  // }

  onSubmit() {
  const formData = new FormData();

  for (const key in this.newPatient) {
    const value = this.newPatient[key as keyof typeof this.newPatient];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  }

  this.http.post('http://localhost:3000/api/createpatient', formData).subscribe(
    (res) => {
      console.log('Patient created', res);
      this.router.navigate(['/patient']);
    },
    (err) => {
      console.error('Error creating patient:', err);
    }
  );
}

}


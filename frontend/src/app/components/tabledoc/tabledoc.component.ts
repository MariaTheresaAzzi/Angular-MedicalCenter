import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabledoc',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tabledoc.component.html',
  styleUrl: './tabledoc.component.css'
})
export class TabledocComponent implements OnInit{

   doctors: any[] = [];
  
    constructor(private doctorService: DoctorService, private http: HttpClient) {}
  
    ngOnInit() {
      this.fetchDoctors();
    }
  
    fetchDoctors() {
      this.doctorService.getDoctors().subscribe({
        next: (data) => this.doctors = data,
        error: (err) => console.error('Failed to load doctors', err)
      });
    }
  
    onAdd() {
      console.log('Add button clicked');
    }

    searchText: string = '';

    filteredDoctors() {
      if (!this.searchText) return this.doctors;

      const lowerSearch = this.searchText.toLowerCase();
      return this.doctors.filter(doctor =>
        doctor.firstname.toLowerCase().includes(lowerSearch) ||
        doctor.lastname.toLowerCase().includes(lowerSearch) ||
        doctor.specialization.toLowerCase().includes(lowerSearch) ||
        doctor.department.toLowerCase().includes(lowerSearch)
      );
    }

    onDelete(id: string) {
      if (confirm('Are you sure you want to delete this doctor?')) {
        // this.http.delete(`/api/doctor/${id}`).subscribe(
        this.http.delete(`http://localhost:3000/api/doctor/${id}`).subscribe(
          () => {
            this.doctors = this.doctors.filter(doc => doc._id !== id); // update UI
          },
          error => {
            console.error('Error deleting doctor:', error);
          }
        );
      }
    }
}

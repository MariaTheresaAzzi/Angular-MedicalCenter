import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  patients: any[] = [];

  constructor(private patientService: PatientService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchPatients();
  }

  fetchPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => console.error('Failed to load patients', err)
    });
  }

  searchText: string = '';
  
  filteredPatients() {
      if (!this.searchText) return this.patients;

      const lowerSearch = this.searchText.toLowerCase();
      return this.patients.filter(patient =>
        patient.firstname.toLowerCase().includes(lowerSearch) ||
        patient.lastname.toLowerCase().includes(lowerSearch) 
      );
    }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.http.delete(`http://localhost:3000/api/patient/${id}`)
        .subscribe({
          next: () => {
            // Remove deleted patient from the list
            this.patients = this.patients.filter(patient => patient._id !== id);
          },
          error: (error) => {
            console.error('Error deleting patient:', error);
          }
        });
    }
  }
}

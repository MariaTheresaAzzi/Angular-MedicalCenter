import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

   private apiUrl = 'http://localhost:3000/api/patient'; // update the URL if needed

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updatePatient(id: string, patient: Patient) {
  return this.http.put<Patient>(`${this.apiUrl}/api/patients/${id}`, patient);
}

  getAllDoctors() {
    return this.http.get<any[]>(`${this.apiUrl}/api/patients/api/doctors`);
  }
}

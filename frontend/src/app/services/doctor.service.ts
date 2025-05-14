import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:3000/api/doctor'; // update the URL if needed

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

   getDoctorById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateDoctor(id: string, doctor: Doctor) {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
    // return this.http.put<Doctor>(`${this.apiUrl}/api/doctor/${id}`, doctor);
  }

  getAllDoctors() {
  return this.http.get<any[]>(this.apiUrl); // Replace URL with your actual doctors endpoint
}


}

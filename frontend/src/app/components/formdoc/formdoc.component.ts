import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formdoc',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formdoc.component.html',
  styleUrl: './formdoc.component.css'
})
export class FormdocComponent {
  doctors: any[] = [];
  newDoctor = {
    firstname: '',
    lastname: '',
    specialization: '',
    department: ''
  };

  constructor(private router: Router,private http: HttpClient) {}

  onAddDoctor() {
    console.log(this.newDoctor);
    // You can send this.newDoctor to your backend here
    this.http.post('http://localhost:3000/api/createdoctor', this.newDoctor).subscribe(
      (res) => {
        this.newDoctor = { firstname: '', lastname: '', specialization: '', department: '' };
        this.router.navigate(['/doctor']);
      },
      (err) => {
        console.error('Error creating doctor:', err);
      }
    );
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editdoc',
  imports: [RouterOutlet, CommonModule, RouterModule, FormsModule],
  templateUrl: './editdoc.component.html',
  styleUrl: './editdoc.component.css'
})
export class EditdocComponent {
  doctor: Doctor = { firstname: '', lastname: '', specialization: '', department: '' };
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.doctorService.getDoctorById(this.id).subscribe((data) => {
        this.doctor = data;
      });
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.doctorService.updateDoctor(this.id, this.doctor).subscribe(() => {
        this.router.navigate(['/doctor', this.id]);
      });
    }
  }

  
}

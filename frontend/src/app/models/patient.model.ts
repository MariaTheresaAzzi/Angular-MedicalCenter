export interface Patient {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  date_of_birth: string;
  image: File | null;
  document: File | null;
  doctorId: string;
  [key: string]: any;
}
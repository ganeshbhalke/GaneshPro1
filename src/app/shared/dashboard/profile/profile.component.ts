import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName: string = 'Ganesh Bhalke';
  userEmail: string = 'ganesh@gmail.com';
  userPhone: string = '';
  userRole: string = 'Angular Developer';
  userAddress: string = '';
  about: string = '';

  profileImage: string = '';
  avatar: string = 'G';

  constructor() {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // ==========================
  // Load Profile
  // ==========================

  loadProfile(): void {

    const user = localStorage.getItem('currentUser');

    if (user) {

      const data = JSON.parse(user);

      this.userName = data.name || 'Ganesh Bhalke';
      this.userEmail = data.email || '';
      this.userPhone = data.phone || '';
      this.userRole = data.role || 'Angular Developer';
      this.userAddress = data.address || '';
      this.about = data.about || '';
      // this.profileImage = data.profileImage || '/assets/images/Ganesh.jpeg';
this.profileImage = data.profileImage || '';
      this.avatar = this.userName.charAt(0).toUpperCase();

    }

  }

  // ==========================
  // Save Profile
  // ==========================

  saveProfile(): void {

    const profile = {

      name: this.userName,
      email: this.userEmail,
      phone: this.userPhone,
      role: this.userRole,
      address: this.userAddress,
      about: this.about,
      profileImage: this.profileImage

    };

    localStorage.setItem(
      'currentUser',
      JSON.stringify(profile)
    );

    Swal.fire({

      icon: 'success',

      title: 'Profile Updated',

      text: 'Your profile has been updated successfully.',

      confirmButtonColor: '#198754'

    });
    this.userName = '';
this.userEmail = '';
this.userPhone = '';
this.userRole = '';
this.userAddress = '';
this.about = '';
this.profileImage = '';
this.avatar = '';

  }


  // ==========================
// Upload Profile Image
// ==========================

onImageSelected(event: any): void {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {

    this.profileImage = reader.result as string;

    this.avatar = this.userName.charAt(0).toUpperCase();

  };

  reader.readAsDataURL(file);

}

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  // User Details
  userName: string = 'Ganesh';
  userEmail: string = '';
  userPhone: string = '';
  userRole: string = 'Angular Developer';

  // Avatar
  avatar: string = 'G';

  // Profile Image
  profileImage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {

    const user = localStorage.getItem('currentUser');

    if (user) {

      const userData = JSON.parse(user);

      this.userName = userData.name || 'Ganesh';
      this.userEmail = userData.email || '';
      this.userPhone = userData.phone || '';
      this.userRole = userData.role || 'Angular Developer';

      this.profileImage = userData.profileImage || '';

      this.avatar = this.userName
        ? this.userName.charAt(0).toUpperCase()
        : 'G';

    }

  }

  goToProfile(): void {
  console.log('Profile Clicked');
  this.router.navigate(['/profile']);
}

 logout(): void {

  Swal.fire({
    icon: 'success',
    title: 'Logged Out',
    text: 'See you again!',
    timer: 1000,
    showConfirmButton: false
  });

  this.authService.logout();

  setTimeout(() => {

    this.router.navigate(['/']);

  }, 1000);

}

}
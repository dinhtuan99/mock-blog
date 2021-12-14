import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { IUser, IUserUpdate } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser!: IUser;
  settingsForm!: FormGroup;
  isSubmit : boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      imageUrl: this.fb.control(''),
      username: this.fb.control(''),
      bio: this.fb.control(''),
      email: this.fb.control(''),
    })
    this.userService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
      this.settingsForm.patchValue({
        imageUrl: this.currentUser.user.image,
        username: this.currentUser.user.username,
        bio: this.currentUser.user.bio,
        email: this.currentUser.user.email
      })
    })

  }

  submitForm() {
    this.isSubmit = true;
    const userUpdate: IUserUpdate = {
      user: {
        email: this.settingsForm.value.email,
        bio: this.settingsForm.value.bio,
        image: this.settingsForm.value.imageUrl,
        username: this.settingsForm.value.username
      }
    };
    this.userService.updateUser(userUpdate).subscribe(data => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Update in successfully'
      })
      this.router.navigate(['profile', data.user.username])
    });
  }

  update() {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to update?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#fa6342',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.submitForm()
      }
    })
  }

}

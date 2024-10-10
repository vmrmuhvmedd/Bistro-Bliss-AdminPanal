import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);
  formData: any;

  fetchData(e: any) {
    e.preventDefault();
    this.formData = new FormData(e.target);

    const formObject: any = {};
    for (let pair of this.formData.entries()) {
      formObject[pair[0]] = pair[1];
    }

    console.log("Form Data as Object:", formObject);

    this.http.post('http://localhost:3002/users/register', formObject)
      .subscribe(
        response => {
          console.log("Registration Response:", response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error("Registration Error:", error);
        }
      );
  }
  

  ngOnInit(): void {}
}

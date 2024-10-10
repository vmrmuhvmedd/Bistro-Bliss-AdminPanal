import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  http = inject(HttpClient);
  router = inject(Router); 
  formData: any;

  fetchData(e: any) {
    e.preventDefault();
    this.formData = new FormData(e.target);
    console.log(this.formData.get("Name"));

    this.http.post('http://localhost:3002/users/login', this.formData)
      .subscribe(response => {
        console.log("Login successful", response);


        this.router.navigate(['/home']);

      }, error => {
        console.error("Login failed", error);

      });
  }

  ngOnInit(): void {
  }
}

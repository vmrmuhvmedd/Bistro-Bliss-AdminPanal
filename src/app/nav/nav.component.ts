import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  http = inject(HttpClient);
  formData: any;
  productsArray: any[] = [];
  newwData: any;

  currentItem :any = {}
  formDisplay: string = 'none';

  showForm(item?: any) {
    console.log(item)
    if (item) {
      this.currentItem = { ...item };
    }
    this.formDisplay = this.formDisplay === 'none' ? 'flex' : 'none';
  }



  // showForm() {
  // this.formDisplay = this.formDisplay === 'none' ? 'flex' : 'none';
  // }

  sendData(e: any) {
    e.preventDefault();
    this.formData = new FormData(e.target);

    const formObject: any = {};
    for (let pair of this.formData.entries()) {
      if (pair[0] === 'price') {
        formObject[pair[0]] = Number(pair[1]);
      } else if (pair[0] === 'productImage') {
        formObject[pair[0]] = pair[1];
      } else {
        formObject[pair[0]] = pair[1];
      }
    }

    console.log("Form Data as Object:", formObject);

    this.http.post('http://localhost:3002/products', this.formData)
      .subscribe(
        response => {
          console.log("Product added successfully:", response);
          this.fetchData();
        },
        error => {
          console.error("Error adding product:", error);
        }
      );
  }

  fetchData() {
    this.http.get('http://localhost:3002/products')
      .subscribe((response: any) => {
        this.productsArray = response;
      });
  }

  deleteProduct(_id : string) {
    this.http.delete(`http://localhost:3002/products/${_id}`)
      .subscribe(
        response => {
          this.fetchData();
        },
        error => {
          console.error("Error adding product:", error);
        }
      );
  }

  // updateDate(_id : string,  newData : any) {

  //   this.http.patch(`http://localhost:3002/products/${_id}`, newData)
  //   .subscribe(
  //     response => {
  //       this.fetchData();
  //     },
  //     error => {
  //       console.error("Error adding product:", error);
  //     }
  //   )
  // }
    //(click)="updateDate(product._id, newData)"



  ngOnInit(): void {
    this.fetchData();
  }
}

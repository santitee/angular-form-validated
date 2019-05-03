import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[];
  form: FormGroup;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      email: ''
    });
  }
  
  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    this.users = [];
    this.httpClient
      .get('http://codecamp3-simple-api.herokuapp.com/api/users')
      .subscribe(result => {
        this.users = result as any[];
      });
  }
  addUser() {
    const newUser = this.form.value;
    this.httpClient
      .post('http://codecamp3-simple-api.herokuapp.com/api/users', newUser)
      .subscribe(result => {
        this.form.reset();
        alert('Add User Success !');
        this.loadUser();
      });
  }
 

}

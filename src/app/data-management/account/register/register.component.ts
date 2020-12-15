import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // profileUser :FormGroup;
  constructor( public fb: FormBuilder) { }

  ngOnInit(): void {
  }
  profileForm=new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      fullname: new FormControl(''),
      sex: new FormControl(''),
      role: new FormControl(''),
  })
}

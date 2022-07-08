import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  selectedFile : any;
  color = "green";
  imgURL : any;

  constructor() {}

  ngOnInit(): void {}

  saveURL(event : any) {
    if (event.target.files.length == 0){
      return;
    }
    
    this.selectedFile = < File > event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
      localStorage.setItem('image', this.imgURL);
    };
  }

}

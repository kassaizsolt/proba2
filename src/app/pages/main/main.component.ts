import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef | undefined

  selectedFile : any;
  imgURL : any;
  hatter = localStorage.getItem('image');
  menuVariable:boolean = false;
  req : any;
  

  simForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    type: new FormControl(''),
    photo: new FormControl('')
  });

  constructor(private http: HttpClient) { 
    if(this.hatter == null){
      localStorage.setItem('image', '../../../assets/images/proba-back-1.jpeg');
      this.hatter = localStorage.getItem('image');
    }
  }
 



  ngOnInit(){
    this.observer.observe(document.querySelector('.animation')!);
  }



  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const diagramm = entry.target.querySelector('.diagramm');
      
      if(entry.isIntersecting) {
        diagramm!.classList.add('diagramm-animation');
        return;
      }

      diagramm!.classList.remove('diagramm-animation');

    });
  });

  openMenu(){
    this.menuVariable =! this.menuVariable;
  }

  toSection1(){
    document.getElementById("section1")?.scrollIntoView({behavior: "smooth"});
  }

  toSection2(){
    document.getElementById("section2")?.scrollIntoView({behavior: "smooth"});
  }

  toSection3(){
    document.getElementById("section3")?.scrollIntoView({behavior: "smooth"});
  }

  toSIM(){
    document.getElementById("SIM")?.scrollIntoView({behavior: "smooth"});
  }

  toStart(){
    document.getElementById("hero")?.scrollIntoView({behavior: "smooth"});
  }


  submitData(event : any){    

    const imageBlob = this.fileInput?.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
        
    
    alert('Email sikeresen elküldve');

    
    this.http.post<any>('/', file).subscribe((response: any) => {
      console.log(response);
    })

    const formData = {
      name : this.simForm.get('name')?.value,
      email : this.simForm.get('email')?.value,
      type : this.simForm.get('type')?.value,
    } 
    

    let xhr = new XMLHttpRequest;
    xhr.open('POST', '/send');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(formData));
  }

}


import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimaisService } from '../animais.service';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {

  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentual: number = 0;

  constructor(private animaisService: AnimaisService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({
      file: ['',Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    })
  }

  upload(){
    const allowComments = this.formularioAnimal.get('allowComments')?.value ?? false;
    const description   = this.formularioAnimal.get('description')?.value ?? '';
    this.animaisService
    .upload(description,allowComments, this.file)
    .pipe(finalize(() => this.router.navigate(['animais'])))
    .subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.UploadProgress){
        const total = event.total ?? 1;
        this.percentual = Math.round(100 * (event.loaded / total));
      }
    },
    (error) => console.log(error)
    );
  }

  gravaArquivo(arquivo: any){
    const file = arquivo?.files[0];
    const reader = new FileReader();

    this.file = file;
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}

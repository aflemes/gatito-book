import { Router } from '@angular/router';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { novoUsuarioValidator } from './novo-usuario.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private novoUsuarioService: NovoUsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['',[
        Validators.required, Validators.email
      ]],
      fullName: ['',[
        Validators.required, Validators.minLength(4)
      ]],
      userName: [''],
      password: ['']
    },{
      validators:[novoUsuarioValidator],
    });
  }

  onSubmit(){

    if (!this.novoUsuarioForm.valid)
      return;

    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {
      this.router.navigate(['']);
    },
    (error) =>{
      console.log(error);
    });
  }



}

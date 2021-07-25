import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private autenticacao: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.autenticacao.autenticar(this.username, this.password).subscribe(() => {
      this.router.navigate(['animais']);
    },
    (error) => {
      alert("Usuario ou senha invalido!");
      console.log(error);
    });
  }

}

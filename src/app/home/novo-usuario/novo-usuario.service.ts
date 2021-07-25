import { environment } from './../../../environments/environment';
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API= environment.API;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http:HttpClient) {

  }

  cadastraNovoUsuario(novoUsuario: NovoUsuario){
    return this.http.post(API + "/user/signup", novoUsuario);
  }

  getUsername(userName: string){
    return this.http.get(API + "/user/exists/" + userName);
  }
}

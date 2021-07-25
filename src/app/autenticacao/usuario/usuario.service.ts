import { Usuario } from './usuario';
import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService:TokenService ) {
    if (this.tokenService.hasToken()){
      this.decodificaJWT();
    }
  }

  private decodificaJWT(){
    const token = this.tokenService.getToken();
    const userName = jwtDecode(token) as Usuario;

    this.usuarioSubject.next(userName);
  }

  retornaUsuario(){
    return this.usuarioSubject.asObservable();
  }

  atribuiToken(token: string){
    this.tokenService.setToken(token);
    this.decodificaJWT();
  }

  logout(){
    this.tokenService.delToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokenService.hasToken();
  }

}

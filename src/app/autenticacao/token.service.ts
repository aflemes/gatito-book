import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(){
    return localStorage.getItem(KEY) ?? '';
  }

  setToken(token: string){
    localStorage.setItem(KEY, token);
  }

  delToken(){
    localStorage.removeItem(KEY);
  }

  hasToken(){
    return !!this.getToken();
  }
}

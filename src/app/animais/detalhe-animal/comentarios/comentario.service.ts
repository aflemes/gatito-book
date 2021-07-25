import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario, Comentarios } from './comentarios';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private httpClient: HttpClient) { }

  buscaComentarios(id: number): Observable<Comentarios>{
    return this.httpClient.get<Comentarios>(`${API}/photos/${id}/comments`);
  }
  addComentario(id: number, commentText: string): Observable<Comentario>{
    return this.httpClient.post<Comentario>(`${API}/photos/${id}/comments`, {
      commentText,
    });
  }
}

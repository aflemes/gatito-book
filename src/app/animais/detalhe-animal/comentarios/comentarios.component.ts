import { switchMap, tap } from 'rxjs/operators';
import { ComentarioService } from './comentario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Comentarios } from './comentarios';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(private comentariosService: ComentarioService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentariosService.buscaComentarios(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario:['', Validators.maxLength(300)]
    });
  }

  gravar(): void{
    const comentarios = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentariosService.addComentario(this.id, comentarios).pipe(
      switchMap(() => this.comentariosService.buscaComentarios(this.id)),
      tap(() => {
        this.comentarioForm.reset();
      })
    );

  }

}

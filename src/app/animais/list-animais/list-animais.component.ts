import { ActivatedRoute } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-animais',
  templateUrl: './list-animais.component.html',
  styleUrls: ['./list-animais.component.css']
})
export class ListAnimaisComponent implements OnInit {

  animais!: Animais;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.animais = this.activatedRoute.snapshot.data['animais'];
    })
  }

}

import { AnimaisService } from './../animais.service';
import { Animal } from './../animais';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  id!: number;
  animal$!: Observable<Animal>;

  constructor(private animaisService: AnimaisService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.animal$ = this.animaisService.buscaPorId(this.id);
  }

  curtir(){
    this.animaisService.curtir(this.id).subscribe((curtida) => {
      if (curtida){
        this.animal$ = this.animaisService.buscaPorId(this.id);
      }
    });
  }

  excluir(){
    this.animaisService.excluiAnimal(this.id).subscribe(() => {
      this.router.navigate(["/animais/"]);
    },
    (error) => console.log(error)
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'MARVEL Comics',
      desc: 'MARVEL - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_image: ''
  };

  constructor( private heroeService: HeroesService,
               private activatedRoute: ActivatedRoute, 
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.router.url.includes('edit')){
      this.activatedRoute.params.pipe(
        switchMap(
          ({id}) => this.heroeService.getHeroeById(id)
        )
      ).subscribe(
        heroe => this.heroe = heroe
      );
    }
  }

  saveHeroe(){
    if(this.heroe.superhero.trim().length > 0){
      if(this.heroe.id){
        this.heroeService.updateHeroe(this.heroe).subscribe(
          heroe => this.showSnackBar('Registro actualizado')
        );
      }else{
        this.heroeService.addHeroe(this.heroe).subscribe(
          heroe => this.router.navigate(['/heroes/edit', heroe.id])
        );
      }
    }
  }

  deleteHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "250px",
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.heroeService.deleteHeroe( this.heroe.id! ).subscribe(
            resp => {
              this.router.navigate(['/heroes']);
              this.showSnackBar('Registro Creado');
            }
          );
        }
      }
    );
  }

  showSnackBar( message: string ):void {
    this.snackBar.open(message, 'OK!', {
      duration: 2500    
    });
  }

}

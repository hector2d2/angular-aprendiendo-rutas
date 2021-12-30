import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: String = environment.baseUrl;

  constructor( private http: HttpClient ) {

   }

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroeById( id: String ): Observable<Heroe>{
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${id}`);
  }
  
  getSuggetsion( wordSearch: String ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ wordSearch }&_limit=6`);
  }

  addHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }
  
  updateHeroe( heroe: Heroe ): Observable<Heroe>{
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${heroe.id}`, heroe);
  }
  
  deleteHeroe( idHeroe: String ): Observable<any>{
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${idHeroe}`);
  }
}

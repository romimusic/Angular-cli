import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';



@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  cargada = false;
  equipo: any []= [];
  constructor(private http: HttpClient) { 
    //console.log("servicio de infoPage listo")
    this.cargarInfo();
    this.cargarTeam();

  }

  private cargarInfo(){
    // Leer el archivo JSON
    this.http.get('assets/data/data-page.json')    
      .subscribe( resp => {
      this.cargada= true;
      this.info= resp;
      
    });
  }

  private cargarTeam(){
    this.http.get('https://angular-portafolio-40834.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {
        this.equipo = resp;

      })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsInterface } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  cargando = true;
  productos: ProductsInterface[] = [];

  constructor(private http: HttpClient) { 
    this.productList();
  }

  private productList(){
    this.http.get('https://angular-portafolio-40834.firebaseio.com/productos_idx.json')
    .subscribe( (resp: ProductsInterface[]) => {
      this.productos= resp;
      this.cargando= false;
           
    });
  }
}

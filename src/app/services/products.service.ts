import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsInterface } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  cargando = true;
  productos: ProductsInterface[] = [];
  productosFiltrado: ProductsInterface [] = [];


  constructor(private http: HttpClient) { 
    this.productList();
  }

  private productList(){

    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-portafolio-40834.firebaseio.com/productos_idx.json')
        .subscribe( (resp: ProductsInterface[]) => {
         this.productos= resp;
         this.cargando= false;
         resolve();
    });
    })
    
  }

  getProduct (id: string){
   return this.http.get(`https://angular-portafolio-40834.firebaseio.com/productos/${id}.json`)
  }



  buscarProducto(termino: string){
    if (this.productos.length === 0) {
      //cargar producto
      this.productList().then( () => {
        // ejecutar después de tener los productos
        // aplicar filtro
      this.filtrarProductos(termino);
      });
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }
    
  }

  private filtrarProductos ( termino: string){
    console.log( this.productos)
    this.productosFiltrado= []; //aquí se blanquea el producto filtrado 
    
    termino= termino.toLocaleLowerCase(); // para que no sea sensible a minúscula o mayúscula
    
    this.productos.forEach( prod => {
      const tituLower= prod.titulo.toLocaleLowerCase();

      //para saber si coincide el filtro de búsqueda con el listado 
      if(prod.categoria.indexOf( termino ) >= 0 || tituLower.indexOf( termino ) >= 0){
        this.productosFiltrado.push(prod);
      }
    })
  }
}

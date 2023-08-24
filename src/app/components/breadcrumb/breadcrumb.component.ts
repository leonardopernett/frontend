import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StateService } from '../../services/state.service';
import { CategoriesApiService } from '../../api/categories-api.service';
import { Breadcrumb } from './interface/breadcrumb.interface';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls:['./breadcrumb.component.css'],
})

export class BreadCrumbComponent {
    rutaActual: string = '';
    nombre?:string;
    categoria
    cliente

    rutas:Breadcrumb[] = [
            {  nombre: 'Favoritos', ruta: '/app/favorites' },
            {  nombre: 'Calendario', ruta: '/app/news' },
            {  nombre: 'Aprendizajes Ágiles', ruta: '/app/preturnos' },
            {  nombre: 'Permisos Bases', ruta: '/app/users' },
            {  nombre: 'Indicadores', ruta: '/app/reports' },
            {  nombre: 'Zendesk', ruta: '/app/zendesk' },
            {  nombre: 'Nik Bases', ruta: '/app/bases' },
            {  nombre: 'Permisos Usuario', ruta: '/app/permisos' },
            {  nombre: 'Papeleria Reciclaje', ruta: '/app/papeleria-reciclaje' },
            {  nombre: 'Usuarios Temporales', ruta: '/app/usuario-ldap' }
      ];

    constructor(private router: Router,
         private activatedRoute: ActivatedRoute,
         private categoriesApi: CategoriesApiService,
         private state: StateService
         ) { }

    ngOnInit() {

        this.cliente=this.state.getValueOf("selectedCliente").cliente

        const childRoute = this.activatedRoute.firstChild;
        
        if (childRoute) {
        childRoute.url.subscribe(async (segments) => {

            if(segments[0].path==="articles"){
                this.categoria=await this.breadcrumbCategoria(segments[1].path)
            }
            
            const path = segments.map((segment) => segment.path).join('/');

            const url = '/app/'+ path;
                const pattern = /^\/app\/(articles|explore|favorites|news|preturnos|users|reports|zendesk|bases|permisos|papeleria-reciclaje|usuario-ldap)/;
                const match = url.match(pattern);
                if(match==null){return}
                this.rutaActual=match[0]
                if (match) {
                const desiredPart = match[0];

            this.rutas.forEach(datos=> {

                if(desiredPart==='/app/articles'){
                    this.nombre='Articulo'
                }

                if(datos.ruta===desiredPart){
                    this.nombre=datos.nombre
                }
            });

        }

        });
        }

        this.router.events.subscribe(async (event) => {
            if (event instanceof NavigationEnd) {

                const numero = event.urlAfterRedirects.split("/")[2];
                if(numero=='articles'){
                    this.categoria=await this.breadcrumbCategoria(event.urlAfterRedirects.split("/")[3])
                }

                const url = event.urlAfterRedirects;
                const pattern = /^\/app\/(articles|explore|favorites|news|preturnos|users|reports|zendesk|bases|permisos|papeleria-reciclaje|usuario-ldap)/;
                const match = url.match(pattern);
                if(match==null){return}
                this.rutaActual=match[0];
                if (match) {
                const desiredPart = match[0];
                this.rutas.forEach(datos=> {
                    
                    if(desiredPart==='/app/articles'){
                        this.nombre='Articulo'
                    }
                    
                    if(datos.ruta===desiredPart){
                        this.nombre=datos.nombre
                    }
                });
                
                }

              
            }
          });
     
      }
    
     async breadcrumbCategoria(idarticulo){

        const data: any[] = await this.categoriesApi.breadcrumbCategory(idarticulo)
      .pipe(
        map((data: any) => {
          const names = data.map(item => item.name);
          names.reverse();
          return names.join(' / ');
        })
      )
      .toPromise();

    return data

      }

}
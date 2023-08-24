import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StateService } from "../../services/state.service";
import { ArticlesApiService } from "../../api/articles-api.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-obligatorios',
  templateUrl: './obligatorios.component.html',
  styleUrls: ['./obligatorios.component.css']
})
export class ObligatoriosComponent implements OnInit {


  buscar
  obligatorios
  fechainicial
  fechafinal
  titulo
  id

  constructor(
    public state:StateService,
    private articlesApi:ArticlesApiService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getSearchArticle()
  
  }

  getSearchArticle(){

    this.articlesApi.tablaobligatorio().subscribe(data=>{
      this.obligatorios=data
    })

  }

  buscararticulo(){

    if(this.buscar == undefined || this.buscar==""){ 

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo vacio'
      })
      
    }

    this.articlesApi.searchArticleRequired(this.buscar).subscribe(data=>{

      this.obligatorios=[]
      this.obligatorios=data

    })
    
  }

  vaciar(){

    this.buscar=""
    this.obligatorios=[]
    this.getSearchArticle()

  }

  pasarela(fecha_inicial,fecha_final,titulo,id){

     this.fechainicial=fecha_inicial
     this.fechafinal=fecha_final
     this.titulo=titulo
     this.id=id

  }

  editar(inicial,final){

    if(this.titulo == undefined || this.titulo==""){ 

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de titulo vacio'
      })
      
    }

    this.articlesApi.editarperiodo(inicial.value,final.value,this.titulo,this.id).subscribe(data=>{

      this.getSearchArticle()

      Swal.fire({
        icon:'success',
        title: 'Editando con exito',
        showConfirmButton: false,
        timer: 1500
    })

      document.getElementById("closeModal").click();

    })


  }

}
import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { CategoriesApiService, categoryRaw } from "../../api/categories-api.service";
import { JarvisApiService, personData } from "../../api/jarvis-api.service";
import { cliente, PcrcApiService } from "../../api/pcrc-api.service";
import { StateService } from "../../services/state.service";
import { Article } from '../../article';
import { ReportsApiService } from "../../api/reports-api.service";
import { posibleFilterFields } from "../../api/reports-api.service";
import format from 'date-fns/format';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  public initialDateDrop = false
  public finalDateDrop = false
  
  public categoryDrop = false
  public articlesDrop = false

  public isDirectorActive = false
  public isGerenteActive = false
  public isCoordinadorActive = false
  public isLiderActive = false
  public isPcrcActive = false
  public isCategoriaActive = false
  public isArticleActive = false  

  clientesList: cliente[]
  pcrcList: cliente['pcrcs'][0][]
  categoriesList: {
    state: "finish" | "loading";
    value?: categoryRaw[];
  }

  directores: personData[]
  gerentesList: personData[]
  coordisList: personData[]
  lideresList: personData[]

  selectedCliente: cliente
  selectedPcrc: cliente['pcrcs'][0]
  selectedCategory: categoryRaw
  selectedArticle: Article

  selectedDirector: personData
  selectedGerente: personData
  selectedCoordi: personData
  selectedLider: personData

  initialDate:Date
  finalDate:Date
  initialDateHumanRead = ''
  finalDateHumanRead = ''

  cantidadArticulos = 0
  cantidadFavoritos = 0
  cantidadDislikes = 0
  cantidadLikes = 0
  cantidadLecturas = 0
  cantidadVistas = 0
  cantidadRebote = 0

  indicadores:{ [t:string]:{ name:string, value:string } } 

  constructor(
    public state: StateService,
    public pcrcApi: PcrcApiService,
    public jarvisApi: JarvisApiService,
    public categoriesApi: CategoriesApiService,
    public reportsApi: ReportsApiService,
    public router:Router
  ) { }

  ngOnInit() {

   this.router.navigate(['/app/reports/comentarios'])

  }

  clienteSelected(selectedClient: cliente) {

    this.selectedCliente = selectedClient

    this.isPcrcActive = true

    this.pcrcList = [ { cod_pcrc:'0', id_dp_pcrc:0, pcrc:'Cualquiera' } , ...selectedClient.pcrcs ]

    this.categoriesList = null

    this.selectedCategory = null

    this.selectedPcrc = null

  }

  pcrcSelected(event: cliente['pcrcs'][0]) {

    this.selectedPcrc = event

    this.selectedCategory = null

    this.categoriesApi.getCategories(this.selectedPcrc.id_dp_pcrc.toString()).pipe(
      tap(categories => {
        if(categories.state == 'finish'){
          this.categoriesList = { state:'finish', value:[ {
            icon:'',
            id:'',
            name:'Cualquiera',
            base_id:'',
            parent_id:'',
            position:0
          }, ...categories.value] }

        } else {
          this.categoriesList = categories

        }

        this.isCategoriaActive = true;
      })
    ).subscribe()

  }

  categorySelected(event: categoryRaw) {

    this.selectedCategory = event

    this.isArticleActive = true

  }

  articleSelected(event: Article) {
    this.articlesDrop = false
    this.selectedArticle = event
  }

  onInitialDateChange(event: { value: Date }) {
    this.initialDate = event.value
    this.initialDate.setHours(0)
    this.initialDate.setMinutes(0)
    this.initialDateHumanRead = format(this.initialDate, "dd/MM/y")
  }

  onFinalDateChange(event: { value: Date }) {
    this.finalDate = event.value
    this.finalDate.setHours(23)
    this.finalDate.setMinutes(59)
    this.finalDateHumanRead = format(this.finalDate, "dd/MM/y")
  }  

  onDirectorSelected(directorSelected: personData) {

    console.log(directorSelected)

    this.selectedDirector = directorSelected;

    this.jarvisApi.getDirectorGerentes(directorSelected.cedula).pipe(
      tap(gerentes => {
        this.gerentesList = [{ cedula: '0', nombre: 'Cualquiera' }, ...gerentes]
        this.isGerenteActive = true;
      })
    ).subscribe()

  }

  onGerenteSelected(gerenteSelected: personData) {
    this.selectedGerente = gerenteSelected

    this.jarvisApi.getGerenteCoordis(gerenteSelected.cedula).pipe(
      tap(coordis => {
        this.coordisList = [{ cedula: '0', nombre: 'Cualquiera' }, ...coordis];
        this.isCoordinadorActive = true;
      })
    ).subscribe()
  }

  onCoordiSelected(coordiSelected: personData) {
    this.selectedCoordi = coordiSelected

    this.jarvisApi.getCoordiLideres(coordiSelected.cedula).pipe(
      tap(lideres => {
        this.isLiderActive = true
        this.lideresList = [{ cedula: '0', nombre: 'Cualquiera' }, ...lideres]
      })
    ).subscribe()
  }

  onLiderSelected(selectedLider: personData) {
    this.selectedLider = selectedLider
  }

  search() {

    if(!!!this.initialDate && !!!this.finalDate){
      this.initialDate = (new Date())
    }

    if(!!this.initialDate && !!this.finalDate){

      this.indicadores = {
        'cantidadMegusta':{ name:'Cantidad de "útiles"', value:'' },
        'cantidadNoMegusta':{ name:'Cantidad de "no útiles"', value:'' },
        'visitas':{ name:'Numero de visitas', value:'' },
        'comentarios':{ name:'Cantidad de comentarios', value:'' }
      }


      console.log('prueba')
      this.reportsApi.getEvent('like', this.getFilters(), this.initialDate.getTime().toString(), this.finalDate.getTime().toString()).pipe(
        tap(result => {
          
          this.indicadores.cantidadMegusta.value = result.value
        })
      ).subscribe()

      this.reportsApi.getEvent('dislike', this.getFilters(), this.initialDate.getTime().toString(), this.finalDate.getTime().toString()).pipe(
        tap(result => {
          this.indicadores.cantidadNoMegusta.value = result.value
        })
      ).subscribe()

      this.reportsApi.getEvent('view', this.getFilters(), this.initialDate.getTime().toString(), this.finalDate.getTime().toString()).pipe(
        tap(result => {
          this.indicadores.visitas.value = result.value
        })
      ).subscribe()

      this.reportsApi.getEvent('comment', this.getFilters(), this.initialDate.getTime().toString(), this.finalDate.getTime().toString()).pipe(
        tap(result => {
          this.indicadores.comentarios.value = result.value
        })
      ).subscribe()



    } else if(!!this.initialDate) {

      this.initialDate.setHours(23)

      this.initialDate.setMinutes(59)

      this.indicadores = {
        'favoritismo':{ name:'Favoritismo', value:'' },
        'articulos':{ name:'Cantidad artículos', value:'' },
        'indiceGusto':{ name:'Índice de utilidad', value:'' },
        'indiceDisgusto':{ name:'Índice de no utilidad', value:'' },
        'cantidadMegusta':{ name:'Cantidad de "útiles"', value:'' },
        'cantidadNoMegusta':{ name:'Cantidad de "no útiles"', value:'' },
        'lecturabilidad':{ name:'Lecturabilidad', value:'' },
        'rebotes':{ name:'Tasa de rebote', value:'' },
        'visitas':{ name:'Numero de visitas', value:'' },
        'comentarios':{ name:'Cantidad de comentarios', value:'' }
    
      }

      this.reportsApi.getCount('articles', this.getFilters(), this.initialDate.getTime().toString()).pipe(
        tap(result => {
          this.indicadores.articulos = { name: 'Cantidad de articulos', value: result.value.toString() }
          this.cantidadArticulos = result.value
        }),
        switchMap(result => this.reportsApi.getCount('favorite', this.getFilters(), this.initialDate.getTime().toString())),
        tap(result => {
          if(this.cantidadArticulos == 0){
            this.indicadores.favoritismo.value = '0%'
          } else {
            this.indicadores.favoritismo.value = ((result.value/this.cantidadArticulos)*100).toFixed(1).toString() + '%'
          }
  
          this.cantidadFavoritos = result.value
        })
      ).subscribe()
  
      let dislikes$ = this.reportsApi.getCount('dislike', this.getFilters(), this.initialDate.getTime().toString()).pipe(
        tap(result => {
          this.cantidadDislikes = result.value
          this.indicadores.cantidadNoMegusta.value = result.value.toString()
        })
      )
  
      let likes$ = this.reportsApi.getCount('like', this.getFilters(), this.initialDate.getTime().toString()).pipe(
        tap(result => {
          this.cantidadLikes = result.value        
          this.indicadores.cantidadMegusta.value = result.value.toString()
        })
      )
  
      forkJoin(dislikes$,likes$).pipe(
        tap(([dislikes,likes]) => {
  
          let totalValoraciones = dislikes.value +  likes.value
  
          if(totalValoraciones == 0){
  
            this.indicadores.indiceDisgusto.value = '0%'
  
            this.indicadores.indiceGusto.value = '0%'
  
          } else {
            
            this.indicadores.indiceDisgusto.value = ((dislikes.value / totalValoraciones )*100).toFixed(1).toString()+'%'
            
            this.indicadores.indiceGusto.value = ((likes.value / totalValoraciones )*100).toFixed(1).toString()+'%'
  
          }
  
        })
      ).subscribe()
  
      let lecturas$ = this.reportsApi.getViews(this.initialDate.getTime(), this.getFilters(), 40000, 999999999).pipe(
        tap(result => {
          this.cantidadLecturas = result.value
        })
      )
  
      let visitas$ = this.reportsApi.getViews(this.initialDate.getTime(), this.getFilters(), 0, 999999999).pipe(
        tap(result => {
          this.cantidadVistas = result.value
          this.indicadores.visitas.value = result.value.toString()
        })
      )
  
      let rebotes$ =  this.reportsApi.getViews(this.initialDate.getTime(), this.getFilters(), 0, 10000).pipe(
        tap(result => {
          this.cantidadRebote = result.value
        })
      )
  
      forkJoin(lecturas$, visitas$, rebotes$).pipe(
        tap(([lecturas, visitas, rebotes]) => {
          if(lecturas.value + rebotes.value == 0){
            this.indicadores.lecturabilidad.value = '0%'
            this.indicadores.rebotes.value = '0%'
          } else {
            this.indicadores.lecturabilidad.value = ((lecturas.value/(lecturas.value + rebotes.value))*100).toFixed(1).toString() + '%'
            this.indicadores.rebotes.value = ((rebotes.value/(lecturas.value + rebotes.value))*100).toFixed(1).toString() + '%'
          }
        })
      ).subscribe()
  
      this.reportsApi.getEvent('comment', this.getFilters(), new Date().setFullYear(2000).toString(), this.initialDate.getTime().toString()).pipe(
        tap(result => {
          this.indicadores.comentarios.value = result.value
        })
      ).subscribe()

    }

  }

  getFilters() {

    let filter1: { filter: posibleFilterFields, value: string }

    let filter2: { filter: posibleFilterFields, value: string }

    if (!!this.selectedCliente && this.selectedCliente.cliente != 'Cualquiera') {
      filter1 = { value: this.selectedCliente.id_dp_clientes.toString(), filter: 'cliente' }
      if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {
        filter1 = { value: this.selectedPcrc.id_dp_pcrc.toString(), filter: 'pcrc' }
        if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {
          filter1 = { value: this.selectedCategory.id, filter: 'categoria' }
          if (!!this.selectedArticle && this.selectedArticle.title != 'Cualquiera') {
            filter1 = { value: this.selectedArticle.id, filter: 'articulo' }
          }
        }
      }
    }

    if (!!this.selectedDirector && this.selectedDirector.cedula != '0') {
      filter2 = { filter: 'director', value: this.selectedDirector.cedula }
      if (!!this.selectedGerente && this.selectedGerente.cedula != '0') {
        filter2 = { filter: 'gerente', value: this.selectedGerente.cedula }
        if (!!this.selectedCoordi && this.selectedCoordi.cedula != '0') {
          filter2 = { filter: 'coordinador', value: this.selectedCoordi.cedula }
          if (!!this.selectedLider && this.selectedLider.cedula != '0') {
            filter2 = { filter: 'lider', value: this.selectedLider.cedula }
          }
        }
      }
    }

    return [ filter1, filter2].filter(f => f)
  }

}
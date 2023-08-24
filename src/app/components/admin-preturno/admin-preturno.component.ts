import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from '../../api/articles-api.service';
import { Options } from 'select2';
import { PreturnoService } from '../../api/preturno.service';
import { StateService } from '../../services/state.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-preturno',
  templateUrl: './admin-preturno.component.html',
  styleUrls: ['./admin-preturno.component.css']
})
export class AdminPreturnoComponent {

  public options: Options;
  public options2: Options;
  public options3: Options;
  
  accion
  accion1=false
  accion2=false
  accion3=false
  accionCuestionario=false
  accionCuestionarioConcepto=false
  accionCuestionarioUnico=false
  accionF=false
  accionOcultar=false
  activarCuestionario=0
  arraypreguntas: any[];
  arraypreguntasconcepto: any[];
  arraypreguntasunicas: any[];
  cliente
  clientesList
  fechafinal
  fechafinaleditar
  fechainicial
  fechainicialeditar
  id_preturno
  nrespuestas=[]
  nrespuestas2=[]
  nrespuestas3=[]
  nrespuestas4=[]
  objetoProcesado = [];
  palabratipo;
  pcrc=[]
  pcrcList
  personasA
  personasList
  preguntas=0
  preguntasconcepto=[];
  preguntasconceptog=[];
  preguntaunica1
  preguntaunica2
  preguntaunica3
  preguntaunica4
  preturnocontenido
  preturnocontenidoeditar
  preturnodescripcion
  preturnodescripcioneditar
  preturnos
  preturnotitulo
  preturnotituloeditar
  respuestarray=[]
  respuestarray2=[]
  respuestarray3=[]
  respuestarray4=[]
  respuestas: any[][];
  respuestasconcepto=[];
  respuestasconceptog=[];
  respuestasunicas: any[][];
  tipopreturno
  validarconcepto=0
  validarmultiple=0
  validarunico=0
  pregunta1
  respuestacorrecta1
  respuesta1
  respuesta2
  respuesta3
  pregunta2
  respuestacorrecta2
  respuesta4
  respuesta5
  respuesta6
  pregunta3
  respuestacorrecta3
  respuesta7
  respuesta8
  respuesta9
  pregunta4
  respuestacorrecta4
  respuesta10
  respuesta11
  respuesta12
  

  constructor(
    private articlesApi:ArticlesApiService,
    private preturno:PreturnoService,
    public state:StateService,
    private Translate:TranslateService
  ) { }

  ngOnInit() {
    

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };

    this.options2 = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };

    this.options3 = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };

    this.obtenerclientes()
    this.mostrarpreturno()
    this.perosnasacargo()

  }

  obtenerTipopreturno(){

    if(this.accionF==false){
      this.tipopreturno=1
      this.palabratipo="Aprendizaje Ágil | Asignación por cliente y pcrc"
    }else{
      this.tipopreturno=2
      this.palabratipo="Aprendizaje Ágil | Asignación por equipo a cargo en Jarvis"
    }

  }

  perosnasacargo(){

    this.preturno.personasacargo(this.state.getValueOf('user').sub).subscribe((data:any)=>{
      
      if(data.length==0){
        this.accionOcultar=false
        this.tipopreturno=1
        this.palabratipo="Aprendizaje Ágil | Asignación por cliente y pcrc"
      }else{
        this.accionOcultar=true
        this.tipopreturno=2
        this.palabratipo="Aprendizaje Ágil | Asignación por equipo a cargo en Jarvis"  
      }

      if(data.length==0){
        this.accionF=true
      }else{
        this.accionF=false
        this.personasA=data.map(item=>{
          return {
            id:item.documento,
            text:item.nombre_completo
          }
        })
        
      }

    })

  }

  mostrarpreturno(){
    this.preturno.mostrarpreturnoadmin(this.state.getValueOf('user').sub).subscribe(data=>{
      this.preturnos=data
    })
  }

  obtenerclientes(){

    this.articlesApi.getCliente().subscribe((data:any)=>{

      this.cliente=data.map(item=>{
        return {
          id:item.id_dp_clientes,
          text:item.cliente
        }
      })

    })
  }

  log(focus){
   
    if(focus==false){
      this.obtenerPcrcs()
    }
  }

  obtenerPcrcs(){

    if(this.clientesList==null){
      return
    }

    this.articlesApi.getPcrc(this.clientesList).subscribe((data:any)=>{
    
      this.pcrc=data.map(item=>{
        return {
          id:item.id_dp_pcrc,
          text:item.pcrc+" "+item.cod_pcrc
        }
      })

    })

   

  }

  insertarpreturno(){

    

   if(this.accionCuestionario==true){this.validarmultiple=1}
   if(this.accionCuestionarioUnico==true){this.validarunico=1}
   if(this.accionCuestionarioConcepto==true){this.validarconcepto=1}

    let preturno={
      preturnotitulo:this.preturnotitulo,
      preturnodescripcion:this.preturnodescripcion,
      preturnocontenido:this.preturnocontenido,
      fechainicial:this.fechainicial,
      fechafinal:this.fechafinal,
      pcrcList:this.pcrcList,
      validarmultiple:this.validarmultiple,
      validarunico:this.validarunico,
      validarconcepto:this.validarconcepto,
      personasList:this.personasList,
      tipopreturno:this.tipopreturno,
      cedula:this.state.getValueOf('user').sub,
      tokencosmo:localStorage.getItem('tokencosmo')
    }

    if(this.preturnotitulo== undefined || this.preturnotitulo==""){ 

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de titulo vacio'
      })
      
    }
  
    if(this.preturnodescripcion == undefined || this.preturnodescripcion==""){ 
  
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de descripcion vacio'
      })
      
    }
  
    if(this.preturnocontenido == undefined || this.preturnocontenido==""){ 
  
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de contenido vacio'
      })
      
    }

    if(this.fechainicial == undefined || this.fechafinal== undefined){ 


      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('No puede dejar los campos de fechas vacios')
      })
      
    }

    if(this.fechainicial>this.fechafinal){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('La fecha Inicial debe ser menor que la final')
      })
      
    }

    if(this.tipopreturno==1){

    if(this.pcrcList == undefined || this.pcrcList== null || this.pcrcList.length==0){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('El pcrc y el cliente no pueden estar vacios')
      })
      
    }
  }

     this.preturno.insertarpreturno(preturno).subscribe((data:any)=>{

     if(this.accionCuestionario==true){

      this.preturno.guardarPreguntas(data.insertId,this.arraypreguntas,this.respuestas).subscribe()
 
    }

    if(this.accionCuestionarioUnico==true){

      this.preturno.guardarPreguntasUnicas(data.insertId,this.arraypreguntasunicas,this.respuestasunicas).subscribe()

    }

    if(this.accionCuestionarioConcepto==true){

      this.preturno.guardarPreguntasConcepto(data.insertId,this.preguntasconceptog,this.respuestasconceptog).subscribe()

    }

      this.mostrarpreturno()

      Swal.fire({
        icon: 'success',
        title: 'Guardado con exito',
        text: this.Translate.instant('Preturno creado')
      })

    }) 

  }

  eliminarpreturno(idpreturno){


      Swal.fire({

        title: this.Translate.instant('Estas Seguro?'),
        text:  this.Translate.instant('Tu quieres borrar el preturno'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.Translate.instant('Si')
  
      }).then((result) => {
        if (result.isConfirmed) {
         
            this.preturno.borrarpreturno(idpreturno).subscribe(data=>{

              this.mostrarpreturno()

              Swal.fire(
                this.Translate.instant('Borrado con exito'),
                this.Translate.instant('El preturno fue borrado'),
                'error'
              )

            })

        }
      })


  }

  editarpreturno(idpreturno,titulo,descripcion,contenido,fechaini,fechafin){

   

   this.id_preturno=idpreturno
   this.preturnotituloeditar=titulo
   this.preturnodescripcioneditar=descripcion
   this.preturnocontenidoeditar=contenido
   this.fechainicialeditar=fechaini
   this.fechafinaleditar=fechafin

  

  }

  actualizarpreturno(inicial,final){


    if(this.preturnotituloeditar == undefined || this.preturnotituloeditar==""){ 

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de titulo vacio'
      })
      
    }
  
    if(this.preturnodescripcioneditar == undefined || this.preturnodescripcioneditar==""){ 
  
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de descripcion vacio'
      })
      
    }
  
    if(this.preturnocontenidoeditar == undefined || this.preturnocontenidoeditar==""){ 
  
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede dejar el campo de contenido vacio'
      })
      
    }

    if(final.value == undefined || inicial.value== undefined){ 


      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('No puede dejar los campos de fechas vacios')
      })
      
    }

    if(inicial.value>final.value){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('La fecha Inicial debe ser menor que la final')
      })
      
    }

      this.preturno.editarpreturno(this.id_preturno,this.preturnotituloeditar,this.preturnodescripcioneditar,
        this.preturnocontenidoeditar,inicial.value,final.value).subscribe(data=>{

        this.mostrarpreturno()

      Swal.fire({
        icon: 'success',
        title: 'Editado con exito',
        text: this.Translate.instant('Preturno editado')
      })

      })

  }


  guardarCuestionario(preguntastotal,pregunta1,respuestacorrecta1,respuesta1,respuesta2,respuesta3,pregunta2,respuestacorrecta2,respuesta4,respuesta5,respuesta6
    ,pregunta3,respuestacorrecta3,respuesta7,respuesta8,respuesta9,pregunta4,respuestacorrecta4,respuesta10,respuesta11,respuesta12){


      if(this.preguntas==0){

        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.Translate.instant('Selecciona un numero de preguntas')
        })
  
        return

      }

    if(preguntastotal==1){

    if(pregunta1==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      
      
    }

    if(respuestacorrecta1==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      
      
    }

    if(respuesta1==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      
      
    }

  }

  if(preguntastotal==4){

    if(pregunta4==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      
      
    }

    if(respuestacorrecta4==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      
      
    }

    if(respuesta10==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      
      
    }

  }


  if(preguntastotal==3){

    if(pregunta3==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      
      
    }

    if(respuestacorrecta3==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      
      
    }

    if(respuesta7==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      
      
    }

  }

  if(preguntastotal==2){

    if(pregunta2==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      
      
    }

    if(respuestacorrecta2==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

    
      
    }

    if(respuesta4==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      
      
    }

  }


    this.arraypreguntas=[pregunta1,pregunta2,pregunta3,pregunta4]

    let respuestas1=[respuestacorrecta1,respuesta1,respuesta2,respuesta3]

    let respuestas2=[respuestacorrecta2,respuesta4,respuesta5,respuesta6]

    let respuestas3=[respuestacorrecta3,respuesta7,respuesta8,respuesta9]

    let respuestas4=[respuestacorrecta4,respuesta10,respuesta11,respuesta12]

    this.respuestas=[respuestas1,respuestas2,respuestas3,respuestas4]

    this.accionCuestionario=true

    this.activarCuestionario=1

    Swal.fire({
      icon: 'success',
      title: 'Cuestionario Guardado Temporalmente',
      text: this.Translate.instant('Solo sera guardado cuando el articulo sea creado')
    })



  }


  crearespuestas(e){

    this.nrespuestas=[]
    
    for (let index = 0; index < e.value; index++) {
      this.nrespuestas.push(index)  
    }
    
  }

  getrespuestas(respuesta,i){

    this.respuestarray[i]=respuesta.value.toLowerCase()

  }

  crearespuestas2(e){

    this.nrespuestas2=[]
    
    for (let index = 0; index < e.value; index++) {
      this.nrespuestas2.push(index)  
    }
    
  }

  getrespuestas2(respuesta,i){
    
    this.respuestarray2[i]=respuesta.value

  }

  crearespuestas3(e){

    this.nrespuestas3=[]
    
    for (let index = 0; index < e.value; index++) {
      this.nrespuestas3.push(index)  
    }
    
  }

  getrespuestas3(respuesta,i){

    this.respuestarray3[i]=respuesta.value

  }

  crearespuestas4(e){

    this.nrespuestas4=[]
    
    for (let index = 0; index < e.value; index++) {
      this.nrespuestas4.push(index)  
    }
    
  }

  getrespuestas4(respuesta,i){

    this.respuestarray4[i]=respuesta.value

  }

  mensaje(){
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.Translate.instant('No se pueden dejar campos de preguntas vacios')
    })
  }

  mensaje2(){
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.Translate.instant('Por favor asigne respuestas')
    })
  }

  guardarUnicas(){

    if(this.preguntas==0){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Seleccione numero de preguntas')
      })
      
    }

    let cont=0

    let respuesta_clean=this.respuestarray.filter(Boolean)
    let respuesta_clean2=this.respuestarray2.filter(Boolean)
    let respuesta_clean3=this.respuestarray3.filter(Boolean)
    let respuesta_clean4=this.respuestarray4.filter(Boolean)

    this.arraypreguntasunicas=[this.preguntaunica1,this.preguntaunica2,this.preguntaunica3,this.preguntaunica4]

    this.respuestasunicas=[respuesta_clean,respuesta_clean2,respuesta_clean3,respuesta_clean4]

    let arraypreguntasunicas = this.arraypreguntasunicas.filter(function(dato){
      return (dato != undefined && dato!="")
    });

    if(arraypreguntasunicas.length!=this.preguntas){

      return this.mensaje()

    }else{

      for (let index = 0; index < this.preguntas; index++) {

        if(index==0){
          if(this.nrespuestas.length==this.respuestasunicas[index].length && this.nrespuestas.length!=0){
            cont=cont+1
          }
        }

        if(index==1){
          if(this.nrespuestas2.length==this.respuestasunicas[index].length && this.nrespuestas2.length!=0){
            cont=cont+1
          }
        }

        if(index==2){
          if(this.nrespuestas2.length==this.respuestasunicas[index].length){
            cont=cont+1
          }
        }

        if(index==3){
          if(this.nrespuestas2.length==this.respuestasunicas[index].length){
            cont=cont+1
          }
        }
        
      }

      if(cont==this.preguntas){

        Swal.fire({
          icon: 'success',
          title: 'Cuestionario Guardado Temporalmente',
          text: this.Translate.instant('Solo sera guardado cuando el articulo sea creado')
        })

      }else{
        this.mensaje2()
      }

    }

    this.accionCuestionarioUnico=true

  }

  agregarpregunta(){

    if(this.preguntasconcepto.length==0){
      this.preguntasconcepto.push(1)
    }else{
      const ultimo = this.preguntasconcepto.length - 1;
      this.preguntasconcepto.push(this.preguntasconcepto[ultimo]+1);
    }
    

  }

  agregarespuesta(){

    if(this.respuestasconcepto.length==0){
      this.respuestasconcepto.push(1)
    }else{
      const ultimo = this.respuestasconcepto.length - 1;
      this.respuestasconcepto.push(this.respuestasconcepto[ultimo]+1);
    }
    

  }

  guardarConcepto(){

    if(this.preguntasconceptog.length!=this.preguntasconcepto.length){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('No puedes dejar campos de pregunta vacio')
      })

    }

    if(this.respuestasconceptog.length!=this.respuestasconcepto.length){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('No puedes dejar campos de respuesta vacio')
      })

    }

    let mpreguntas
    mpreguntas=this.preguntasconcepto.length-this.respuestasconcepto.length

    if(this.respuestasconcepto.length>this.preguntasconcepto.length){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('No pueden haber mas respuestas que preguntas')
      })

    }
 
    if(mpreguntas==2){

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('No pueden haber mas de dos preguntas sin respuesta')
      })

    }

    Swal.fire({
      icon: 'success',
      title: 'Cuestionario Guardado Temporalmente',
      text: this.Translate.instant('Solo sera guardado cuando el articulo sea creado')
    })
  
    this.accionCuestionarioConcepto=true

  }

  quitarespuesta(){
    this.respuestasconcepto.pop()
    this.respuestasconceptog.pop()
  }

  quitarpregunta(){
    this.preguntasconcepto.pop()
    this.preguntasconceptog.pop()
  }

}




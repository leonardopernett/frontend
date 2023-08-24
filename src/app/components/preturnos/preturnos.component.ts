import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { PreturnoService } from 'src/app/api/preturno.service';
import Swal from 'sweetalert2';
import { StateService } from '../../services/state.service';

@Component({ 
  selector: 'app-preturnos',
  templateUrl: './preturnos.component.html',
  styleUrls: ['./preturnos.component.css']
})
export class PreturnosComponent implements OnInit {

  isVisible!:boolean
  title:string ='Responde tus preguntas'
  data=""
  preturnos=[]
  preturnoscargo=[]
  preturnos_validados=[]
  arrayRespuestaUser=[]
  titulover
  contenidover
  totalvalidado
  totalvalidadomultiple
  totalvalidadocargo
  mostrarmultiple=false
  respuestas;
  pregunta: any[];
  id_preturno
  respuesta: any;
  respuesta2: any;
  respuesta3: any;
  respuesta4: any;
  respuesta5: any;
  respuestau: any;
  respuestau2: any;
  respuestau3: any;
  respuestau4: any;
  respuestau5: any;
  idrespuesta1
  idrespuesta2
  idrespuesta3
  idrespuesta4
  idrespuesta5
  respuestasUser = [];
  vistomultiple
  vistounico
  vistoconcepto
  mostrar
  mostrarconcepto=false
  mostrarunico=false
  visto
  total_tabla
  preguntaconcepto=[];
  respuestasunicas;
  resp1
  resp2:any
  validasu=0
  validasm=0
  validasc=0
  totalu=0
  totalm=0
  totalc=0
  aprobado
  sentenceWords=[];
  dat=[]
  todo
  palabras;
  palabrasdes=[];
  palabrasF;
  nrespuestas
  
  constructor(
    public state:StateService,
    private preturno:PreturnoService,
    private translate:TranslateService
    ) { }
 
  ngOnInit() {

     this.mostrarpreturno()
     this.mostrarpreturnoacargo()  
     this.total()
     this.avance()
     this.aprobacion()
     this.totalcargo()
    
  }

 

  avance(){

    this.preturno.avance(this.state.getValueOf('user').sub,this.state.getValueOf('selectedPcrc').id_dp_pcrc).subscribe(data=>{
      this.total_tabla=data
    })

  }

  aprobacion(){

    this.preturno.aprobacion(this.state.getValueOf('user').sub).subscribe((data:any)=>{
      this.aprobado=data.avance
    })

  }

  total(){
    this.preturno.total(this.state.getValueOf('selectedPcrc').id_dp_pcrc,this.state.getValueOf('user').sub).subscribe((data:any)=>{
    this.totalvalidado=data
    })

  }

  totalcargo(){
    this.preturno.totalcargo(this.state.getValueOf('user').sub).subscribe((data:any)=>{
       this.totalvalidadocargo=data
    })

  }

   mostrarpreturno(){
     this.preturno.mostrarpreturno(this.state.getValueOf('selectedPcrc').id_dp_pcrc).subscribe((data:any)=>{

      data.forEach(element => {
        
        this.preturno.validarocultar(this.state.getValueOf('user').sub,element.id_preturno).subscribe(data=>{

          if(data==0){

            this.preturnos.push(element)

          }else{

            this.preturnos_validados.push(element)

          }

        })

      });

      
       
     })
   }

   mostrarpreturnoacargo(){
    this.preturno.mostrarpreturnoacargo(this.state.getValueOf('user').sub).subscribe((data:any)=>{

     data.forEach(element => {
       
       this.preturno.validarocultar(this.state.getValueOf('user').sub,element.id_preturno).subscribe(data=>{

         if(data==0){

           this.preturnoscargo.push(element)
           

         }else{

           this.preturnos_validados.push(element)

         }

       })

     });

      
    })
  }

 verpreturno(id,titulo,contenido,multiple,unica,concepto){

    if(multiple==1){this.mostrarmultiple=true}else{this.mostrarmultiple=false}
    if(concepto==1){this.mostrarconcepto=true}else{this.mostrarconcepto=false}
    if(unica==1){this.mostrarunico=true}else{this.mostrarunico=false}
    if(multiple==0 && unica==0 && concepto==0){this.mostrar=true}else{this.mostrar=false}
    
       
    this.titulover=titulo
    this.contenidover=contenido
    this.id_preturno=id

    this.preturno.vistoMultiple(this.state.getValueOf('user').sub,id).subscribe(data=>{
      this.vistomultiple=data
    })

    this.preturno.visto(this.state.getValueOf('user').sub,id).subscribe(data=>{
      this.visto=data
    })

    this.preturno.vistoUnico(this.state.getValueOf('user').sub,id).subscribe(data=>{
      this.vistounico=data
    })

    this.preturno.vistoConcepto(this.state.getValueOf('user').sub,id).subscribe(data=>{
      this.vistoconcepto=data
    })

 }

 obtenerpreguntasconcepto() {
  if (this.mostrarconcepto && this.vistoconcepto == 0) {
    this.dat = [];
    this.sentenceWords = [];
    this.palabrasdes= [];

    this.preturno.obtenerpreguntasconceptos(this.id_preturno).subscribe((data: any) => {

      if (data.length === 0) {

      } else {

        const observables = data.map(element => {
          return this.preturno.obtenerespuestasconcepto(element.id_pregunta);
        });

        forkJoin(observables).subscribe((responses: any[]) => {
          responses.forEach(data => {

            if(data.length!=0){

              this.totalc=this.totalc+1

              this.palabrasdes.push(data[0].respuestas)

            this.dat.push({
              id_pregunta:data[0].id_pregunta,
              name:data[0].respuestas,
              value:[]
            })

            }

          });

          this.palabras=this.shuffle(this.palabrasdes)
          
          
          data.forEach(element => {
            this.sentenceWords.push({ palabra: element.pregunta, id_pregunta: element.id_pregunta });
          });

        });
      }
    });
  }

  this.totalc=0

}

 obtenerpreguntas(){

  if(this.mostrarmultiple && this.vistomultiple==0){

  this.preturno.obtenerpreguntas(this.id_preturno).subscribe((data:any)=>{
    
  let preguntas=[]

  data.forEach(element => {
    preguntas.push({id:element.id_pregunta,pregunta:element.pregunta})
  });

  var hash = {};

  this.pregunta = preguntas.filter(function(current) {
    var exists = !hash[current.id];
    hash[current.id] = true;
    return exists;
  });

  this.respuestas=data

  this.respuestas.sort(function() { return Math.random() - 0.5 });
    
  })

}

}

obtenerpreguntasunicas(){

  if(this.mostrarunico && this.vistounico==0){

  

  this.preturno.obtenerpreguntasunicas(this.id_preturno).subscribe((data:any)=>{
 
    let preguntas2=[]
  
    data.forEach(element => {
      preguntas2.push({id:element.id_pregunta,pregunta:element.pregunta})
    });
  
    var hash = {};
  
    this.preguntaconcepto = preguntas2.filter(function(current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
  
    this.respuestasunicas=data
      
    })

  }

}

capturar(e,pregunta){

  if(pregunta==0){
    this.respuesta=e.target.value
  }

  if(pregunta==1){
    this.respuesta2=e.target.value
  }

  if(pregunta==2){
    this.respuesta3=e.target.value
  }

  if(pregunta==3){
    this.respuesta4=e.target.value
  }

  if(pregunta==4){
    this.respuesta5=e.target.value
  }
  
}

capturarunica(e,pregunta,id){

  this.nrespuestas=pregunta

  if(pregunta==0){
    this.respuestau=e.value.toLowerCase()
    this.idrespuesta1=id
  }

  if(pregunta==1){
    this.respuestau2=e.value.toLowerCase()
    this.idrespuesta2=id
  }

  if(pregunta==2){
    this.respuestau3=e.value.toLowerCase()
    this.idrespuesta3=id
  }

  if(pregunta==3){
    this.respuestau4=e.value.toLowerCase()
    this.idrespuesta4=id
  }

  if(pregunta==4){
    this.respuestau5=e.value.toLowerCase()
    this.idrespuesta5=id
  }
  
}

async validarconcepto() {

  const preguntasCoincidentes = this.dat.filter(item => item.name === item.value[0]);
  this.validasc = preguntasCoincidentes.length;

  const isValid = this.dat.every(item => item.value.includes(item.name));

  if (isValid) {
    await this.preturno.guardarCuestionarioConcepto(this.id_preturno, this.state.getValueOf('user').sub).toPromise();

    this.total();
    return 0;
  } else {
    return 1;
  }

}

mensaje(){

  return Swal.fire(
    this.translate.instant('¡Error!'),
    this.translate.instant('No puedes dejar respuestas vacias'),
    'error'
  )

}

validarunica(){

  let cont=0
  
    switch (this.nrespuestas) {

    case 1:
      if(this.respuestau==undefined){ this.mensaje();return}
      break;     
    case 2:
      if(this.respuestau==undefined || this.respuestau2==undefined){this.mensaje();return}
      break; 
    case 3:
      if(this.respuestau==undefined || this.respuestau2==undefined || this.respuestau3==undefined){this.mensaje();return}
      break; 
    case 4:
      if(this.respuestau==undefined || this.respuestau2==undefined || this.respuestau3==undefined || this.respuestau4==undefined){this.mensaje();return}
      break; 
    case 5:
      if(this.respuestau==undefined || this.respuestau2==undefined || this.respuestau3==undefined || this.respuestau4==undefined || this.respuestau5==undefined){this.mensaje();return}
      break;
      }

  this.respuestasunicas.forEach(element => {
    
    if(element.id_pregunta==this.idrespuesta1){
      if(element.respuestas==this.respuestau){
        cont=cont+1
      }
    }

    if(element.id_pregunta==this.idrespuesta2){
      if(element.respuestas==this.respuestau2){
        cont=cont+1
      }
    }

    if(element.id_pregunta==this.idrespuesta3){
      if(element.respuestas==this.respuestau3){
        cont=cont+1
      }
    }

    if(element.id_pregunta==this.idrespuesta4){
      if(element.respuestas==this.respuestau4){
        cont=cont+1
      }
    }

    if(element.id_pregunta==this.idrespuesta5){
      if(element.respuestas==this.respuestau5){
        cont=cont+1
      }
    }

  });

  this.validasu=cont
  this.totalu=this.preguntaconcepto.length

  if(this.preguntaconcepto.length==cont){
   
    this.preturno.guardarCuestionarioUnico(this.id_preturno,this.state.getValueOf('user').sub).subscribe()

    this.total()

        return 0
    
  }else{

    
    this.respuestau=undefined
    this.respuestau2=undefined
    this.respuestau3=undefined
    this.respuestau4=undefined
   
    return 1
    
  }

}

 async validarmultiple(){

  this.respuestasUser.push(this.respuesta,this.respuesta2,this.respuesta3,this.respuesta4,this.respuesta5)

 this.arrayRespuestaUser = this.respuestasUser.filter(function(dato){
  return dato != undefined
});

if(this.arrayRespuestaUser.length!=this.pregunta.length){
  
  Swal.fire(
    this.translate.instant('¡Error!'),
    this.translate.instant('No puedes dejar opciones sin seleccionar'),
    'error'
  )
  
  this.arrayRespuestaUser=[]
  this.respuestasUser=[]
  this.respuesta=undefined
  this.respuesta2=undefined
  this.respuesta3=undefined
  this.respuesta4=undefined
  return
}

 let data:any=await this.preturno.validaRespuestas(this.arrayRespuestaUser)

  this.validasm=data.validas
  this.totalm=data.total

    if (data.validar==0) {
    
     this.preturno.guardarCuestionario(this.id_preturno,this.state.getValueOf('user').sub).subscribe(datos=>{
 
        this.total()
        
      })

    }

    this.respuestasUser=[]
    this.arrayRespuestaUser=[]
    this.respuesta=undefined
    this.respuesta2=undefined
    this.respuesta3=undefined
    this.respuesta4=undefined
 
  return data.validar

}

validar(){

  this.preturno.guardarVisto(this.id_preturno,this.state.getValueOf('user').sub).subscribe(data=>{

    Swal.fire(
      this.translate.instant('Excelente'),
      this.translate.instant('Te ha quedado claro el proceso'),
      'success'
    )
  
    this.total()
    this.preturnos=[]
    this.preturnos_validados=[]
    this.preturnoscargo=[]
    this.mostrarpreturno()
    this.avance()
    this.totalcargo()
  this.mostrarpreturnoacargo()

  })

}

async validartodas(){

  

  let resp1
  let resp2
  let resp3

  if(this.mostrarmultiple && this.vistomultiple==0){
    resp1=await this.validarmultiple()
  }
  
  if(this.mostrarunico && this.vistounico==0){
    resp2=this.validarunica()
  }
 
  if(this.mostrarconcepto && this.vistoconcepto==0){
    resp3=await this.validarconcepto()
  }
  

  if((resp1==1 && resp2==1 && resp3==1)
  || (resp1==1 && resp2==undefined && resp3==1) 
  || (resp1==undefined && resp2==1 && resp3==1)
  || (resp1==1 && resp2==1 && resp3==undefined)
  || (resp1==1 && resp2==undefined && resp3==undefined)
  || (resp1==undefined && resp2==undefined && resp3==1)
  || (resp1==undefined && resp2==1 && resp3==undefined)
  ){
    
    this.preturno.guardarResultado(this.id_preturno,this.state.getValueOf('user').sub,(((this.validasm)/(this.totalm))*100),(((this.validasu)/(this.totalu))*100),(((this.validasc)/(this.totalc))*100)).subscribe()
     
    Swal.fire(
      this.translate.instant('¡Algo no ha quedado tan claro!'),
      this.translate.instant('Te invitamos a leer la información y realizar nuevamente la validación'),
      'error'
    )

    this.avance()
    this.aprobacion()
  
   }

 if((resp1==1 && resp2==0 && resp3==1) 
 || (resp1==0 && resp2==1 && resp3==1)
 || (resp1==1 && resp2==1 && resp3==0)
 || (resp1==1 && resp2==0 && resp3==0)
 || (resp1==0 && resp2==0 && resp3==1)
 || (resp1==0 && resp2==1 && resp3==0)
 || (resp1==undefined && resp2==1 && resp3==0)
 || (resp1==undefined && resp2==0 && resp3==1)
 || (resp1==0 && resp2==1 && resp3==undefined)
 || (resp1==1 && resp2==0 && resp3==undefined)
 || (resp1==0 && resp2==undefined && resp3==1)
 || (resp1==1 && resp2==undefined && resp3==0)
 ){
  
  this.preturno.guardarResultado(this.id_preturno,this.state.getValueOf('user').sub,(((this.validasm)/(this.totalm))*100),(((this.validasu)/(this.totalu))*100),(((this.validasc)/(this.totalc))*100)).subscribe()

  Swal.fire(
    this.translate.instant('¡Algo no ha quedado tan claro!'),
    this.translate.instant('Te invitamos a leer la información y realizar nuevamente la validación. Parte del proceso no te quedo claro'),
    'info'
  )

  this.validasu=0
  this.validasm=0
  this.validasc=0
  this.totalu=0
  this.totalm=0
  this.totalc=0
  this.mostrarpreturno() 
  this.total()
  this.avance()
  this.aprobacion()
  this.totalcargo()
  this.mostrarpreturnoacargo()
  this.preturnos=[]
  this.preturnoscargo=[]
  this.preturnos_validados=[]

 }
 

 if((resp1==0 && resp2==0 && resp3==0) 
 || (resp1==0 && resp2==undefined && resp3==0) 
 || (resp1==undefined && resp2==0 && resp3==0)
 || (resp1==0 && resp2==0 && resp3==undefined)
 || (resp1==0 && resp2==undefined && resp3==undefined)
 || (resp1==undefined && resp2==undefined && resp3==0)
 || (resp1==undefined && resp2==0 && resp3==undefined)
 ){
  
  this.preturno.guardarResultado(this.id_preturno,this.state.getValueOf('user').sub,(((this.validasm)/(this.totalm))*100),(((this.validasu)/(this.totalu))*100),(((this.validasc)/(this.totalc))*100)).subscribe()
  
  Swal.fire(
    this.translate.instant('Excelente'),
    this.translate.instant('Te ha quedado claro el proceso'),
    'success'
  )

  this.validasu=0
  this.validasm=0
  this.validasc=0
  this.totalu=0
  this.totalm=0
  this.totalc=0
  this.preturnos=[]
  this.preturnoscargo=[]
  this.preturnos_validados=[]
  this.mostrarpreturno() 
  this.total()
  this.avance()
  this.aprobacion()
  this.totalcargo()
  this.mostrarpreturnoacargo()

 }
   
}


  drop(event: any) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if(event.container.data.length<=0){

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      }
    }
  }

  shuffle(array) {

    const shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }


}

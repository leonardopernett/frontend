import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { StateService } from "../services/state.service";

@Injectable({
    providedIn:'root'
})
export class PreturnoService {
     @Output() totalPreturno = new EventEmitter()
     @Output() totalPreturnomultiple = new EventEmitter()
     
     constructor(
        private http:HttpClient,
        public state:StateService
        ){
          
        }

     mostrarpreturno(pcrc){

        let data={
            pcrc:pcrc
        }

        return this.http.post(`/api/preturno/mostrar`, data)
    }

    mostrarpreturnoacargo(cedula){

        let data={
            cedula:cedula
        }

        return this.http.post(`/api/preturno/mostraracargo`, data)
    }

    mostrarpreturnoadmin(cedula){

        let data={
            cedula:cedula
        }

        return this.http.post(`/api/preturno/mostraradmin`,data)
    }

     insertarpreturno(preturno){

         return this.http.post(`/api/preturno/insertar`, preturno)

     }

     borrarpreturno(preturno){

        let preturnoborrar={idpreturno:preturno}

        return this.http.post(`/api/preturno/borrar`, preturnoborrar)

    }

    editarpreturno(idpreturnoeditar,tituloeditar,descripcioneditar,contenidoeditar,fechaini,fechafin){

        let data={
            idpreturno:idpreturnoeditar,
            titulo:tituloeditar,
            descripcion:descripcioneditar,
            contenido:contenidoeditar,
            fecha_inicial:fechaini,
            fecha_final:fechafin
        }

        return this.http.post(`/api/preturno/actualizar`, data)

    }

    guardarPreguntas(idpreturno,preguntas,respuestas){
        const datos={idpreturno,preguntas,respuestas}
        return this.http.post('/api/preturno/guardarPreguntas', datos)
    }

    guardarPreguntasUnicas(idpreturno,preguntas,respuestas){
        const datos={idpreturno,preguntas,respuestas}
        return this.http.post('/api/preturno/guardarunica', datos)
    }

    guardarPreguntasConcepto(idpreturno,preguntas,respuestas){
        const datos={idpreturno,preguntas,respuestas}
        return this.http.post('/api/preturno/guardarconcepto', datos)
    }

    total(idpcrc,cedula){
        const datos={idpcrc,cedula}
        return this.http.post('/api/preturno/total', datos)
    }

    totalcargo(cedula){
        const datos={cedula}
        return this.http.post('/api/preturno/totalcargo', datos)
    }

    personasacargo(cedula){
        const datos={cedula}
        return this.http.post('/api/preturno/personasacargo', datos)
    }

    obtenerpreguntas(id_preturno){
        const data={id_preturno}
        return this.http.post('/api/preturno/obtenerpreguntas', data)
    }

    obtenerpreguntasunicas(id_preturno){
        const data={id_preturno}
        return this.http.post('/api/preturno/obtenerpreguntasunica', data)
    }

    obtenerpreguntasconceptos(id_preturno){
        const data={id_preturno}
        return this.http.post('/api/preturno/obtenerpreguntasconcepto', data)
    }

    obtenerespuestasconcepto(id_pregunta){
        const data={id_pregunta}
        return this.http.post('/api/preturno/obtenerespuestasconcepto', data)
    }

    guardarCuestionario(id_preturno,cedula){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/guardarCuestionarioMultiple', datos)
    }

    guardarResultado(id_preturno,cedula,porcentaje1,porcentaje2,porcentaje3){
        const datos={id_preturno,cedula,porcentaje1,porcentaje2,porcentaje3}
        return this.http.post('/api/preturno/guardarResultadoMultiple', datos)
    }

    guardarCuestionarioUnico(id_preturno,cedula){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/guardarCuestionarioUnico', datos)
    }

    guardarCuestionarioConcepto(id_preturno,cedula){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/guardarCuestionarioConcepto', datos)
    }

    validaRespuestas(respuestas){
        const respuesta={respuestas}
        return this.http.post('/api/preturno/validarespuestasMultiple', respuesta).toPromise()
    }

    vistoMultiple(cedula,id_preturno){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/vistoMultiple', datos)
    }

    vistoUnico(cedula,id_preturno){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/vistoUnico', datos)
    }

    vistoConcepto(cedula,id_preturno){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/vistoConcepto', datos)
    }

    guardarVisto(id_preturno,cedula){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/guardarVisto', datos)
    }

    visto(cedula,id_preturno){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/visto', datos)
    }

    validarocultar(cedula,id_preturno){
        const datos={id_preturno,cedula}
        return this.http.post('/api/preturno/validarocultar', datos)
    }

    avance(cedula,pcrc){
        const datos={pcrc,cedula}
        return this.http.post('/api/preturno/avance', datos)
    }

    aprobacion(cedula){
        const datos={cedula}
        return this.http.post('/api/preturno/aprobacion', datos)
    }

    guardarunica(idpreturno,preguntas,respuestas){
        const datos={idpreturno,preguntas,respuestas}
        return this.http.post('/api/preturno/guardarunica', datos)
    }

}
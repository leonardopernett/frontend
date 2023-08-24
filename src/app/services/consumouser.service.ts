import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class ConsumoUser {

constructor(private socket:Socket) { }

conectado(cedula){
    return this.socket.emit('Conectar',cedula);
}

}
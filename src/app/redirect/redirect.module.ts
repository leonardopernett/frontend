import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectComentarioComponent } from './redirect.comentario';
import { RedirectLecturaComponent } from './redirect.lecturabilidad';
import { RedirectBaseComponent } from './redirect.base';
import { RedirectCambioComponent } from './redirect.cambio';
import { RedirectUsuarioComponent } from './redirect.usuario';
import { RedirectTotalArticuloComponent } from './redirect.totalarticulo';
import { RedirectTotalVistaComponent } from './redirect.totalvista';
import { RedirectObligatorioComponent } from './redirect.obligatorio';
import { RedirectCuestionarioComponent } from './redirect.cuestionario';
import { RedirectPreturnoComponent } from './redirect.preturno';

@NgModule({
  declarations: [RedirectPreturnoComponent,RedirectCuestionarioComponent,RedirectTotalArticuloComponent,RedirectTotalVistaComponent,RedirectComentarioComponent, RedirectLecturaComponent,RedirectBaseComponent, RedirectCambioComponent,RedirectUsuarioComponent,RedirectObligatorioComponent],
  imports: [
    CommonModule,
  ],
  exports:[RedirectPreturnoComponent,RedirectCuestionarioComponent,RedirectTotalArticuloComponent,RedirectTotalVistaComponent,RedirectComentarioComponent,RedirectLecturaComponent, RedirectBaseComponent,RedirectCambioComponent,RedirectUsuarioComponent,RedirectObligatorioComponent]
})
export class RedirectModule { }

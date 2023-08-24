import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ArticleCreatorComponent } from "./components/article-creator/article-creator.component";
import { BaseDatosComponent } from "./components/base-datos/base-datos.component";
import { EdicionComponent } from "./components/edicion/edicion.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { FullScreenComponent } from "./components/full-screen/full-screen.component";
import {ArticleViewBancoComponent} from "./components/articlebanco-view/articlebanco-view.component";
import { AplicationComponent, ArticleViewComponent, ExplorarComponent, HeaderComponent, LoginComponent, SearchComponent } from "./components/index";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";
import { NewsCreatorComponent } from "./components/news-creator/news-creator.component";
import { NewsEditorComponent } from "./components/news-editor/news-editor.component";
import { NewsComponent } from "./components/news/news.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { UsersconfigComponent } from "./components/usersconfig/usersconfig.component";
import { ReporteComentariosComponent } from "./components/reporte-comentarios/reporte-comentarios.component";
import { AuthGuard, HomeGuard, PreloadPcrcGuard } from "./guards/index";
import { CanLeaveArticleGuard } from "./guards/leave.guard";
import { ReporteCambiosComponent } from "./components/reporte-cambios/reporte-cambios.component";
import { UserExternoComponent } from './components/user-externo/user-externo.component';
import { RegisterMailComponent } from './components/registro-mail/register-mail.component';
import { InvitacionComponent } from './components/invitacion/invitacion.component';
import { ReporteLecturaComponent } from './components/reporte-lectura/reporte-lectura.component';
import { RedirectComentarioComponent } from './redirect/redirect.comentario';
import { RedirectLecturaComponent } from './redirect/redirect.lecturabilidad';
import { RedirectBaseComponent } from './redirect/redirect.base';
import { RedirectCambioComponent } from './redirect/redirect.cambio';
import { RedirectUsuarioComponent } from './redirect/redirect.usuario';
import { RedirectCuestionarioComponent } from './redirect/redirect.cuestionario';
import {ReporteUsuarioComponent} from './components/reporte-usuario/reporte-usuario.component';
import { zendeskComponent } from './components/zendesk/zendesk.component';
import { RedirectTotalArticuloComponent } from './redirect/redirect.totalarticulo';
import { RedirectTotalVistaComponent } from './redirect/redirect.totalvista';
import { ReporteCantidadArticuloComponent } from './components/reporte-cantidad-articulo/reporte-cantidad-articulo.component';
import { ReporteCantidadVistaComponent } from './components/reporte-cantidad-vista/reporte-cantidad-vista.component';
import { ReporteConsolidadoComponent } from './components/reporte-consolidado/reporte-consolidado.component';
import {UserMasiveComponent} from './components/user-masive/user-masive.component'
import { basesComponent } from './components/bases/bases.component';
import {ObligatoriosComponent} from './components/obligatorios/obligatorios.component';

import { permisosComponent } from './components/permisos/permisos.component';

import { PapeleriaReciclajeComponent } from './components/papeleria-reciclaje/papeleria-reciclaje.component';
import { ReporteCuestionarioComponent } from './components/reporte-cuestionario/reporte-cuestionario.component';
import { ReporteObligatorioComponent } from './components/reporte-obligatorio/reporte-obligatorio.component';
import { RedirectObligatorioComponent } from './redirect/redirect.obligatorio';
import { PreturnosComponent } from './components/preturnos/preturnos.component';
import { AdminPreturnoComponent } from './components/admin-preturno/admin-preturno.component';
import { ReportePreturnoComponent } from './components/reporte-preturno/reporte-preturno.component';
import { RedirectPreturnoComponent } from './redirect/redirect.preturno';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { DragComponent } from './components/drag/drag.component';
import { ControlCambioComponent } from './components/control-cambios/control-cambios.component';
import { UserLdapComponent } from './components/usuario-ldap/user-ldap.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';




const routes: Routes = [
	{ path: '', redirectTo: '/app', pathMatch: 'full' }, 
/* 	{ path: 'register/:token', component: RegisterMailComponent }, */
	{ path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
/* 	{ path: 'header', component: HeaderComponent }, */
	/* { path: 'ckeditor', component:CkeditorComponent},	 */
	{ path: 'reset', component: ResetPasswordComponent },	

	{
		path: 'app', component: AplicationComponent, canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'explore', pathMatch: 'full'},
			{ path: 'search', component: SearchComponent },
			{ path: 'explore', component: ExplorarComponent },
			{ path: 'articles', redirectTo: 'explore' },
			{ path: 'articles/:id', component: ArticleViewComponent, canDeactivate: [CanLeaveArticleGuard] },
			{ path: 'article/:id', component: ArticleViewBancoComponent, canDeactivate: [CanLeaveArticleGuard] },
			{ path:'papeleria-reciclaje', component:PapeleriaReciclajeComponent},
			{
				path: 'newseditor',
				component: NewsCreatorComponent,
				children: [
					{ path: ':id', component: NewsEditorComponent }
				]
			},
			{ path: 'news', component: NewsComponent },
			{ path: 'edicion', component: EdicionComponent },
			{ path: 'obligatorios', component: ObligatoriosComponent },
			{ path: 'control/:id/:idarticulo', component: ControlCambioComponent },
			{ path: 'articlecreation', component: ArticleCreatorComponent },
			{ path: 'favorites', component: FavoritesComponent },
			{ path: 'users', component: UsersconfigComponent },
			{ path: 'usermasive', component: UserMasiveComponent },
			{ path: 'invitacion', component: InvitacionComponent },
			{
				path:'preturnos', component:PreturnosComponent
			},

			{
				path: 'reports', component: ReportsComponent,
				children: [
					{ path: 'indicadores', component: IndicadoresComponent },
					{ path: 'basedatos', component: BaseDatosComponent },
					{ path: 'comentarios', component: ReporteComentariosComponent },
					{ path: 'cambios', component: ReporteCambiosComponent },
					{ path: 'lectura', component: ReporteLecturaComponent },
					{ path: 'usuario', component: ReporteUsuarioComponent },
					{ path: 'totalarticulo', component: ReporteCantidadArticuloComponent },
					{ path: 'totalvista', component: ReporteCantidadVistaComponent },
				  { path: 'consolidado', component: ReporteConsolidadoComponent },
				  { path: 'obligatorio', component: ReporteObligatorioComponent },
				  { path: 'cuestionario', component: ReporteCuestionarioComponent },
				  { path: 'preturno', component: ReportePreturnoComponent }
				]
			},

			
			{ path: 'redirect/comentario', component: RedirectComentarioComponent},
			{ path: 'redirect/lecturabilidad', component: RedirectLecturaComponent},
			{ path: 'redirect/base', component: RedirectBaseComponent},
			{ path: 'redirect/cambios', component: RedirectCambioComponent},
			{ path: 'redirect/usuario', component: RedirectUsuarioComponent},
			{ path: 'redirect/totalarticulo', component: RedirectTotalArticuloComponent},
			{ path: 'redirect/totalvista', component: RedirectTotalVistaComponent},
			{path:'redirect/obligatorio',component:RedirectObligatorioComponent},
			{path:'redirect/cuestionario',component:RedirectCuestionarioComponent},
			{path:'redirect/preturno',component:RedirectPreturnoComponent},
			{ path: 'zendesk', component: zendeskComponent},
			{ path: 'bases', component: basesComponent},
			{ path: 'permisos', component: permisosComponent},
			{ path: 'admin-preturno', component: AdminPreturnoComponent},
			{ path: 'usuario-ldap', component:UserLdapComponent}


			
		]
	},
  { path: '**', redirectTo: '' } 
];

const routerOptions: ExtraOptions = {
	useHash: true,
	anchorScrolling: 'enabled',
	// ...any other options you'd like to use
};

@NgModule({
	imports: [RouterModule.forRoot(routes, routerOptions)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
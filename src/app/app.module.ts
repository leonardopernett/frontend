import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from "@visurel/iconify-angular";
import { AppRoutingModule } from './app-routing.module';
import { QuillModule } from 'ngx-quill';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { AutosizeModule } from 'ngx-autosize';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TooltipModule } from 'ng2-tooltip-directive';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgPipesModule } from 'ngx-pipes';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { ArticleCreatorComponent } from './components/article-creator/article-creator.component';
import { ArticleEditableComponent } from './components/article-editable/article-editable.component';
import { ButtonComponent } from './components/button/button.component';
import { CategoriesEditorComponent } from './components/categories-editor/categories-editor.component';
import { CategoryEditableComponent } from './components/category-editable/category-editable.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { IconComponent } from './components/icon/icon.component';
import { AplicationComponent, ArticleComponent, ArticleListComponent, ArticleViewComponent, CategorieComponent, CategoriesComponent, ExplorarComponent, HeaderComponent, HomeComponent, LoginComponent, SearchBoxComponent, SearchComponent } from './components/index';
import { ModalComponent } from './components/modal/modal.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { UsersEditorListComponent } from './components/users-editor-list/users-editor-list.component';
import { JwtInterceptor } from "./services/index";
import { EdicionComponent } from './components/edicion/edicion.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { RTEViewComponent } from './components/rteview/rteview.component';
import { RTEViewBancoComponent } from './components/rteviewbanco/rteviewbanco.component';
import { NewsCreatorComponent } from './components/news-creator/news-creator.component';
import { NewsListEditableComponent } from './components/news-list-editable/news-list-editable.component';
import { NewsComponent } from './components/news/news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { ArticlePrevComponent } from './components/file-prev/file-prev.component';
import { UserRoleIsDirective } from './user-role-is.directive';
import { DisableSelectDirective } from "./disableSelect.directive";
import { SideSheetComponent } from './components/side-sheet/side-sheet.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { TreeViewRowComponent } from './components/tree-view-row/tree-view-row.component';
import { LoadingPipe } from './pipes/loading.pipe';
import { UsersconfigComponent } from './components/usersconfig/usersconfig.component';
import { TreeViewMultiComponent } from './components/tree-view-multi/tree-view-multi.component';
import { TreeViewMultiRowComponent } from './components/tree-view-multi-row/tree-view-multi-row.component';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardComponent } from './components/categories-report/card/card.component';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { CategoriesReportComponent } from './components/categories-report/categories-report.component';
import { ShortArticleListComponent } from './components/short-article-list/short-article-list.component';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';
import { IndicadoresComponent } from './components/indicadores/indicadores.component';
import { BaseDatosComponent } from './components/base-datos/base-datos.component';
import { ReporteComentariosComponent } from './components/reporte-comentarios/reporte-comentarios.component';
import { ReporteCambiosComponent } from './components/reporte-cambios/reporte-cambios.component';
import {ReportePreturnoComponent} from './components/reporte-preturno/reporte-preturno.component';
import { ArticleplaceholderComponent } from './components/articleplaceholder/articleplaceholder.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SlideCaptchaComponent } from './components/slide-captcha/slide-captcha.component';
import { UserExternoComponent } from './components/user-externo/user-externo.component';
import { RegisterMailComponent } from './components/registro-mail/register-mail.component';
import { InvitacionComponent } from './components/invitacion/invitacion.component';
import { RegisterUserExternoService } from './components/registro-mail/register-mail.service';
import { InvitacionService } from './components/invitacion/invitacion.service';
import { ReporteUsuarioComponent } from './components/reporte-usuario/reporte-usuario.component';
import { ReporteLecturaComponent } from './components/reporte-lectura/reporte-lectura.component';
import {UserMasiveComponent} from './components/user-masive/user-masive.component';
import {UserLdapComponent} from './components/usuario-ldap/user-ldap.component'
import { NgxPaginationModule} from 'ngx-pagination'
import { FilterPipe } from './pipes/filter.pipe';
import { RedirectModule } from './redirect/redirect.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'
import { DataTablesModule} from 'angular-datatables'
import { zendeskComponent } from './components/zendesk/zendesk.component';
import { ZendeskPipe } from './pipes/zendesk.pipe';
import { ReporteCantidadArticuloComponent } from './components/reporte-cantidad-articulo/reporte-cantidad-articulo.component';
import { ReporteCantidadVistaComponent } from './components/reporte-cantidad-vista/reporte-cantidad-vista.component';
import { NgSelect2Module } from 'ng-select2'
import { ToastrModule } from 'ngx-toastr'

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io'
import { SocketService } from './services/socket.service';
import { ReporteConsolidadoComponent } from './components/reporte-consolidado/reporte-consolidado.component';
import { ConsolidadorPipe } from './pipes/consolidado.pipe';

/* const config:SocketIoConfig = { url:'http://localhost:3001', options:{} }
 */

/* traslate */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PapeleriaReciclajeComponent } from './components/papeleria-reciclaje/papeleria-reciclaje.component';

import { basesComponent } from './components/bases/bases.component';
import { FilterClientePipe } from './pipes/filtercliente.pipe';
import { FilterPcrcPipe } from './pipes/filterpcrc.pipe';

import { permisosComponent } from './components/permisos/permisos.component';

import { BuscadorPipe } from './pipes/buscador.pipe';
import { ArticleViewBancoComponent } from './components/articlebanco-view/articlebanco-view.component';

import {BasePipe} from './pipes/base.pipe'
import { ObligatoriosComponent } from './components/obligatorios/obligatorios.component';
import { ReporteObligatorioComponent } from './components/reporte-obligatorio/reporte-obligatorio.component';
import { FocusableDirective } from './focusable.directive';
import { ReporteCuestionarioComponent } from './components/reporte-cuestionario/reporte-cuestionario.component';
import { PreturnosComponent } from './components/preturnos/preturnos.component';

/* import { CKEditorModule } from 'ckeditor4-angular'
 */import { CKEditorModule } from 'ckeditor4-angular'
import { AdminPreturnoComponent } from './components/admin-preturno/admin-preturno.component';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { DragComponent } from './components/drag/drag.component';

import {DragDropModule} from '@angular/cdk/drag-drop'
import { ControlCambioComponent } from './components/control-cambios/control-cambios.component';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
    declarations: [
        FocusableDirective,
        AppComponent,
        ObligatoriosComponent,
        ExplorarComponent,
        HeaderComponent,
        SearchBoxComponent,
        SearchComponent,
        ArticleComponent,
        HomeComponent,
        LoginComponent,
        AplicationComponent,
        CategoriesComponent,
        CategorieComponent,
        ArticleListComponent,
        ArticleViewComponent,
        ArticleViewBancoComponent,
        CategoriesEditorComponent,
        CategoryEditableComponent,
        ButtonComponent,
        TextInputComponent,
        IconPickerComponent,
        DropDownComponent,
        IconComponent,
        PagerComponent,
        ModalComponent,
        ArticleEditableComponent,
        ArticleCreatorComponent,
        SearchInputComponent,
        UsersEditorListComponent,
        EdicionComponent,
        RichTextEditorComponent,
        RTEViewComponent,
        RTEViewBancoComponent,
        NewsCreatorComponent,
        NewsListEditableComponent,
        NewsComponent,
        NewsListComponent,
        NewsCardComponent,
        FavoritesComponent,
        CommentListComponent,
        CommentComponent,
        ArticlePrevComponent,
        UserRoleIsDirective,
        DisableSelectDirective,
        SideSheetComponent,
        TreeViewComponent,
        TreeViewRowComponent,
        UserMasiveComponent,
        UserLdapComponent,
        LoadingPipe,
        FilterPipe,
        FilterClientePipe,
        FilterPcrcPipe,
        ZendeskPipe,
        UsersconfigComponent,
        TreeViewMultiComponent,
        TreeViewMultiRowComponent,
        FullScreenComponent,
        SpinnerComponent,
        CardComponent,
        CheckBoxComponent,
        ReportsComponent,
        EventosComponent,
        CategoriesReportComponent,
        ShortArticleListComponent,
        NewsEditorComponent,
        IndicadoresComponent,
        BaseDatosComponent,
        ReporteComentariosComponent,
        ReporteCambiosComponent,
        ArticleplaceholderComponent,
        NotificationsComponent,
        NotificationComponent,
        SlideCaptchaComponent,
        UserExternoComponent,
        RegisterMailComponent,
        InvitacionComponent,
        ReporteLecturaComponent,
        ReporteUsuarioComponent,
        ReporteCantidadArticuloComponent,
        ReporteCantidadVistaComponent,
        zendeskComponent,
        ReporteConsolidadoComponent,
        permisosComponent,
        ReporteObligatorioComponent,
        ReporteCuestionarioComponent,
        AdminPreturnoComponent,
        ConsolidadorPipe,
        PapeleriaReciclajeComponent,
        basesComponent,
        BuscadorPipe,
        BasePipe,
        PreturnosComponent,
        ReportePreturnoComponent,
        CkeditorComponent,
        DragComponent,
        ControlCambioComponent,
        ResetPasswordComponent,
        BreadCrumbComponent
        
        
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        IconModule,
        QuillModule.forRoot(),
        CalendarModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        AutosizeModule,
        NgScrollbarModule,
        PickerModule,
        UploaderModule,
        RadioButtonModule,
        TooltipModule,
        GridModule,
        NgPipesModule,
        RecaptchaModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        RedirectModule,
        NgxSpinnerModule,
        NgSelect2Module,
        DataTablesModule,
        CKEditorModule,
        DragDropModule,
        ReCaptchaModule.forRoot({
            invisible: {
              sitekey: '6LdbhNwlAAAAALxAbtJxydV1RppcyAW0biHOsRMK', 
              },
              normal: {
                  sitekey: '6LdbhNwlAAAAALxAbtJxydV1RppcyAW0biHOsRMK', 
              },
              language: 'es',
          }),
        ToastrModule.forRoot(),
        /* SocketIoModule.forRoot(config) */

        /* traductor configuracion */
        TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http);
            },
            deps: [ HttpClient ]
        }
    })
    

    ],
    providers: [
        NgxSpinnerService ,
        RegisterUserExternoService,
        InvitacionService,
        JwtInterceptor,
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'es'
        }  , 
        SocketService     
    ],
    bootstrap: [AppComponent],

    schemas:[CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

} 
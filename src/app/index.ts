import { AppComponent } from "./app.component";
import { AplicationComponent } from "./components/aplication/aplication.component";
import { ArticleCreatorComponent } from "./components/article-creator/article-creator.component";
import { ArticleEditableComponent } from "./components/article-editable/article-editable.component";
import { ArticleListComponent } from "./components/article-list/article-list.component";
import { ArticleViewComponent } from "./components/article-view/article-view.component";
import { ArticleComponent } from "./components/article/article.component";
import { ArticleplaceholderComponent } from "./components/articleplaceholder/articleplaceholder.component";
import { BaseDatosComponent } from "./components/base-datos/base-datos.component";
import { ButtonComponent } from "./components/button/button.component";
import { CategorieComponent } from "./components/categorie/categorie.component";
import { CategoriesEditorComponent } from "./components/categories-editor/categories-editor.component";
import { CardComponent } from "./components/categories-report/card/card.component";
import { CategoriesReportComponent } from "./components/categories-report/categories-report.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CategoryEditableComponent } from "./components/category-editable/category-editable.component";
import { CheckBoxComponent } from "./components/check-box/check-box.component";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { CommentComponent } from "./components/comment/comment.component";
import { DropDownComponent } from "./components/drop-down/drop-down.component";
import { EdicionComponent } from "./components/edicion/edicion.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { ExplorarComponent } from "./components/explorar/explorar.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { ArticlePrevComponent } from "./components/file-prev/file-prev.component";
import { FullScreenComponent } from "./components/full-screen/full-screen.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { IconPickerComponent } from "./components/icon-picker/icon-picker.component";
import { IconComponent } from "./components/icon/icon.component";
import { IndicadoresComponent } from "./components/indicadores/indicadores.component";
import { InvitacionComponent } from "./components/invitacion/invitacion.component";
import { LoginComponent } from "./components/login/login.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NewsCardComponent } from "./components/news-card/news-card.component";
import { NewsCreatorComponent } from "./components/news-creator/news-creator.component";
import { NewsEditorComponent } from "./components/news-editor/news-editor.component";
import { NewsListEditableComponent } from "./components/news-list-editable/news-list-editable.component";
import { NewsListComponent } from "./components/news-list/news-list.component";
import { NewsComponent } from "./components/news/news.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { PagerComponent } from "./components/pager/pager.component";
import { PapeleriaReciclajeComponent } from "./components/papeleria-reciclaje/papeleria-reciclaje.component";
import { RegisterMailComponent } from "./components/registro-mail/register-mail.component";
import { ReporteCambiosComponent } from "./components/reporte-cambios/reporte-cambios.component";
import { ReporteCantidadArticuloComponent } from "./components/reporte-cantidad-articulo/reporte-cantidad-articulo.component";
import { ReporteCantidadVistaComponent } from "./components/reporte-cantidad-vista/reporte-cantidad-vista.component";
import { ReporteComentariosComponent } from "./components/reporte-comentarios/reporte-comentarios.component";
import { ReporteConsolidadoComponent } from "./components/reporte-consolidado/reporte-consolidado.component";
import { ReporteLecturaComponent } from "./components/reporte-lectura/reporte-lectura.component";
import { ReporteUsuarioComponent } from "./components/reporte-usuario/reporte-usuario.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { RichTextEditorComponent } from "./components/rich-text-editor/rich-text-editor.component";
import { RTEViewComponent } from "./components/rteview/rteview.component";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { SearchComponent } from "./components/search/search.component";
import { ShortArticleListComponent } from "./components/short-article-list/short-article-list.component";
import { SideSheetComponent } from "./components/side-sheet/side-sheet.component";
import { SlideCaptchaComponent } from "./components/slide-captcha/slide-captcha.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { TextInputComponent } from "./components/text-input/text-input.component";
import { TreeViewMultiRowComponent } from "./components/tree-view-multi-row/tree-view-multi-row.component";
import { TreeViewMultiComponent } from "./components/tree-view-multi/tree-view-multi.component";
import { TreeViewRowComponent } from "./components/tree-view-row/tree-view-row.component";
import { TreeViewComponent } from "./components/tree-view/tree-view.component";
import { UserExternoComponent } from "./components/user-externo/user-externo.component";
import { UserMasiveComponent } from "./components/user-masive/user-masive.component";
import { UsersEditorListComponent } from "./components/users-editor-list/users-editor-list.component";
import { UsersconfigComponent } from "./components/usersconfig/usersconfig.component";
import { zendeskComponent } from "./components/zendesk/zendesk.component";
import { DisableSelectDirective } from "./disableSelect.directive";
import { ConsolidadorPipe } from "./pipes/consolidado.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { LoadingPipe } from "./pipes/loading.pipe";
import { ZendeskPipe } from "./pipes/zendesk.pipe";
import { UserRoleIsDirective } from "./user-role-is.directive";


export const components = [
    AppComponent,
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
    LoadingPipe,
    FilterPipe,
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
    ConsolidadorPipe,
    PapeleriaReciclajeComponent
]

export * from "@ctrl/ngx-emoji-mart/search.component";
export * from "./app.component";
export * from "./components/aplication/aplication.component";
export * from "./components/article-creator/article-creator.component";
export * from "./components/article-editable/article-editable.component";
export * from "./components/article-list/article-list.component";
export * from "./components/article-view/article-view.component";
export * from "./components/article/article.component";
export * from "./components/articleplaceholder/articleplaceholder.component";
export * from "./components/base-datos/base-datos.component";
export * from "./components/button/button.component";
export * from "./components/categorie/categorie.component";
export * from "./components/categories-editor/categories-editor.component";
export * from "./components/categories-report/card/card.component";
export * from "./components/categories-report/categories-report.component";
export * from "./components/categories/categories.component";
export * from "./components/category-editable/category-editable.component";
export * from "./components/check-box/check-box.component";
export * from "./components/comment-list/comment-list.component";
export * from "./components/comment/comment.component";
export * from "./components/drop-down/drop-down.component";
export * from "./components/edicion/edicion.component";
export * from "./components/eventos/eventos.component";
export * from "./components/explorar/explorar.component";
export * from "./components/favorites/favorites.component";
export * from "./components/file-prev/file-prev.component";
export * from "./components/full-screen/full-screen.component";
export * from "./components/header/header.component";
export * from "./components/home/home.component";
export * from "./components/icon-picker/icon-picker.component";
export * from "./components/icon/icon.component";
export * from "./components/indicadores/indicadores.component";
export * from "./components/invitacion/invitacion.component";
export * from "./components/login/login.component";
export *from "./components/modal/modal.component";
export * from "./components/news-card/news-card.component";
export * from "./components/news-creator/news-creator.component";
export * from "./components/news-editor/news-editor.component";
export * from "./components/news-list-editable/news-list-editable.component";
export * from "./components/news-list/news-list.component";
export * from "./components/news/news.component";
export * from "./components/notification/notification.component";
export * from "./components/notifications/notifications.component";
export * from "./components/pager/pager.component";
export * from "./components/papeleria-reciclaje/papeleria-reciclaje.component";
export * from "./components/registro-mail/register-mail.component";
export * from "./components/reporte-cambios/reporte-cambios.component";
export * from "./components/reporte-cantidad-articulo/reporte-cantidad-articulo.component";
export * from "./components/reporte-cantidad-vista/reporte-cantidad-vista.component";
export * from "./components/reporte-comentarios/reporte-comentarios.component";
export * from "./components/reporte-consolidado/reporte-consolidado.component";
export * from "./components/reporte-lectura/reporte-lectura.component";
export * from "./components/reporte-usuario/reporte-usuario.component";
export * from "./components/reports/reports.component";
export * from "./components/rich-text-editor/rich-text-editor.component";
export * from "./components/rteview/rteview.component";
export * from "./components/search-box/search-box.component";
export * from "./components/search-input/search-input.component";
export * from "./components/short-article-list/short-article-list.component";
export * from "./components/side-sheet/side-sheet.component";
export *from "./components/slide-captcha/slide-captcha.component";
export * from "./components/spinner/spinner.component";
export * from "./components/text-input/text-input.component";
export * from "./components/tree-view-multi-row/tree-view-multi-row.component";
export * from "./components/tree-view-multi/tree-view-multi.component";
export *from "./components/tree-view-row/tree-view-row.component";
export * from "./components/tree-view/tree-view.component";
export * from "./components/user-externo/user-externo.component";
export * from "./components/user-masive/user-masive.component";
export * from "./components/users-editor-list/users-editor-list.component";
export * from "./components/usersconfig/usersconfig.component";
export * from "./components/zendesk/zendesk.component";
export * from "./disableSelect.directive";
export * from "./pipes/consolidado.pipe";
export * from "./pipes/filter.pipe";
export * from "./pipes/loading.pipe";
export * from "./pipes/zendesk.pipe";
export * from "./user-role-is.directive";
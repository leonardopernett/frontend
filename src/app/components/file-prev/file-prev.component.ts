import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FilesApiService } from "../../api/files-api.service";
import { environment } from "../../../environments/environment";
import {ToastrService} from 'ngx-toastr'
import {Location} from '@angular/common'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-file-prev',
  templateUrl: './file-prev.component.html',
  styleUrls: ['./file-prev.component.css']
})
export class ArticlePrevComponent implements OnInit {
  
  constructor( private filesApi:FilesApiService, private toastr:ToastrService, private location:Location,private translate:TranslateService) {  }

  fileIcons = [
    { ext: 'png',  icon: 'gridicons:image' },
    { ext: 'jpg',  icon: 'gridicons:image' },
    { ext: 'jpeg', icon: 'gridicons:image' },
    { ext: 'xlsx', icon: 'simple-icons:microsoftexcel' },
    { ext: 'xls',  icon: 'simple-icons:microsoftexcel' },
    { ext: 'doc',  icon: 'simple-icons:microsoftword' },
    { ext: 'docx', icon: 'simple-icons:microsoftword' },
    { ext: 'odt',  icon: 'icomoon-free:file-openoffice' },
    { ext: 'ods',  icon: 'whh:spreadsheet' },
    { ext: 'pdf',  icon: 'mdi:file-pdf-outline' },
    { ext: 'ppt',  icon: 'simple-icons:microsoftpowerpoint' },
    { ext: 'pptx', icon: 'simple-icons:microsoftpowerpoint' },
    { ext: 'txt',  icon: 'ant-design:file-text-outline' },
    { ext: 'zip',  icon: 'ant-design:file-zip-outline' },
    { ext: 'rar',  icon: 'ant-design:file-zip-outline' },
    { ext: 'z',    icon: 'ant-design:file-zip-outline' },
    { ext: 'csv',  icon: 'iwwa:file-csv' },
    { ext: 'svg',  icon: 'icomoon-free:svg' },
    { ext: 'cda',  icon: 'icons8:audio-file' },
    { ext: 'mid',  icon: 'mdi:midi' },
    { ext: 'midi', icon: 'mdi:midi' },
    { ext: 'mp3',  icon: 'el:speaker' },
    { ext: 'mpa',  icon: 'icons8:audio-file' },
    { ext: 'ogg',  icon: 'icons8:audio-file' },
    { ext: 'wav',  icon: 'icons8:audio-file' },
    { ext: 'wma',  icon: 'icons8:audio-file' },
    { ext: 'wpl',  icon: 'mdi:playlist-music' },
    { ext: '7z',   icon: 'ant-design:file-zip-outline' },
    { ext: 'arj',  icon: 'ant-design:file-zip-outline' },
    { ext: 'pkg',  icon: 'uil:package' },
    { ext: 'tar',  icon: 'ant-design:file-zip-outline' },
    { ext: 'bin',  icon: 'octicon:file-binary' },
    { ext: 'iso',  icon: 'ic:outline-disc-full' },
    { ext: 'vcd',  icon: 'ic:outline-disc-full' },
    { ext: 'dat',  icon: 'ant-design:file-text-outline' },
    { ext: 'dat',  icon: 'ant-design:file-text-outline' },
    { ext: 'mdb',  icon: 'entypo:database' },
    { ext: 'exe',  icon: 'octicon:file-binary' },
    { ext: 'gif',  icon: 'ic:outline-gif' },
    { ext: 'mp4',  icon: 'foundation:play-video' }
  ]

  @Input() fileName:string;
  @Input() articleId:string;
  @Input() mode:string;

  @Output() onFileDeleted = new EventEmitter();

  ngOnInit() {  }

  getIconName(){
    let fileExt = this.fileName.split('.')[this.fileName.split('.').length - 1]

    let defaultIcon = 'ant-design:file-unknown-outline'

    let iconData = this.fileIcons.find( ({ext}) => ext == fileExt )

    return iconData ? iconData.icon : defaultIcon
  }

  getLink = () => `${environment.endpoint}/api/articles/${this.articleId}/files/${this.fileName}`

  deleteFile = () => {
    this.filesApi.deletFile(this.articleId, this.fileName).subscribe( result => {
      this.onFileDeleted.next()
      this.toastr.info(this.translate.instant('Archivo eliminado'))
 
    })
  }

}
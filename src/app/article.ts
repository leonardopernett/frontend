export interface articleConf{
    id?:string;
    title:string;
    content:string;
    obj:string;
    tags?:string[];
    resume?:string;
    attached?:string[];
    likes?:number;
    dislikes?:number;
    favoritos?:number;
    state?:"published"|"archived";
    publicationDate?:number;
    modificationDate?:number;
    modificationUser?:string;
    creator?:string;
    commentsList?:string;
    line?:string;
    type?:string; 
    subLine?:string;
    category?:string; 
    highlight?: { content: string[] };
    vistas?:number;
}

export class Article implements articleConf{
    public title:string;
    public content:string;
    public tags?:string[];
    public resume?:string;
    public attached?:string[];
    public likes?:number;//user ids
    public dislikes?:number;//user ids
    public favoritos?:number;//user ids
    public state?:"published"|"archived";
    public publicationDate?:number;
    public modificationDate?:number;
    public modificationUser?:string;
    public creator?:string;
    public commentsList?:string;
    public id?:string;
    public subLine?:string;
    public line?:string;
    public category?:string;
    public obj:string;
    public highlight: { content: string[] };
    public vistas:number;
    public type?:string;
    public id_otros?:number;
    public requerido?:number;
    public base_id?:number;

    constructor(config:articleConf){
        this.title = config.title;
        this.content = config.content;
        if(config.tags){
            this.tags = config.tags;
        }
        if(config.resume){
            this.resume = config.resume;
        }
        if(config.attached){
            this.attached = config.attached;
        }
        if(config.likes){
            this.likes = config.likes;
        }
        if(config.dislikes){
            this.dislikes = config.dislikes;
        }
        if(config.favoritos){
            this.favoritos = config.favoritos;
        }
        if(config.state){
            this.state = config.state;
        }
        if(config.publicationDate){
            this.publicationDate = config.publicationDate;
        }
        if(config.modificationDate){
            this.modificationDate = config.modificationDate;
        }
        if(config.modificationUser){
            this.modificationUser = config.modificationUser;
        }
        if(config.creator){
            this.creator = config.creator;
        }
        if(config.commentsList){
            this.commentsList = config.commentsList;
        }
        if(config.id){
            this.id = config.id;
        }
        if(config.line){
            this.line = config.line;
        }
        if(config.subLine){
            this.subLine = config.subLine;
        }
        if(config.subLine){
            this.category = config.category;
        }
        if(config.obj){
            this.obj = config.obj;
        }
        if(config.highlight){
            this.highlight = config.highlight;
        }
        if(config.vistas){
            this.vistas = config.vistas;
        }
        if(config.type){
            this.type = config.type;
        }
    }
}
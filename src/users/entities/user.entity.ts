 export class User {

    id: string="";
    name: string="";
    password: string = "";

    createdAt: number = 0;
    updatedAt?:number = 0;
    favorites?: string[] = [];
}

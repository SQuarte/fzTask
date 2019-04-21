export class FzUserDetail {
    id: number;
    fullname: string;
    description: string;
    imageUrl: string;

    constructor(id: number, fullname: string, description: string, imageUrl: string) {
        this.id = id;
        this.fullname = fullname;
        this.description = description;
        this.imageUrl = imageUrl;
    }

}

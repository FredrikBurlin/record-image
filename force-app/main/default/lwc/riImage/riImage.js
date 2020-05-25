import { LightningElement, api } from 'lwc';

export default class RiImage extends LightningElement {
    url;
    _imageId;

    @api displayType;

    @api
    get imageId() {
        return this._imageId;
    }
    set imageId(value) {
        this._imageId = value;
        this.url = "/sfc/servlet.shepherd/version/download/" + value;
    }
}
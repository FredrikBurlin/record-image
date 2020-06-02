import { LightningElement, api } from 'lwc';

export default class RiImage extends LightningElement {

    @api height = 200 + "px";
    @api borderRadius = 4 + "px";
    @api displayType;
    get style() {
        let listOfProperties = [];
        if (this.displayType === "round") {
            listOfProperties.push("height:" + this.height);
            listOfProperties.push("width:" + this.height);
        }
        if (this.displayType === "panorama") {
            listOfProperties.push("height:" + this.height);
            listOfProperties.push("border-radius:" + this.borderRadius);
        }
        if (this.displayType === "full") {
            listOfProperties.push("border-radius:" + this.borderRadius);
        }
        return listOfProperties.join(";");
    }

    @api imageId;
    get url() {
        console.log(this.imageId);
        if (this.imageId === undefined) {
            return 'https://source.unsplash.com/800x600?dog';
        }
        return "/sfc/servlet.shepherd/version/download/" + this.imageId;
    }

    changeImage() {
        this.dispatchEvent(new CustomEvent('changeimage'));
        console.log('change');
    }
}
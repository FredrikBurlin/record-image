import { LightningElement, api, wire, track } from 'lwc';
import getImageFileCached from '@salesforce/apex/riFileUploadController.getImageFileCached';
import getImageFile from '@salesforce/apex/riFileUploadController.getImageFile';

export default class RiRecordImage extends LightningElement {
    @api displayType;
    @api title;
    @api description;
    @api height;
    @api imageName;
    @api recordId;

    hasImage = true
    showUpload = false;
    images;
    error;

    @wire(getImageFileCached, { recordId: '$recordId', imageName: '$imageName' })
    wireImages({ error, data }) {
        if (data) {
            this.images = data;
            this.hasImage = data.length !== 0;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.images = undefined;
        }
    }

    handleNewImage() {
        getImageFile({ recordId: this.recordId, imageName: this.imageName })
            .then((data) => {
                this.images = data;
                this.showUpload = false;
                this.hasImage = data.length !== 0;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.images = undefined;
            });
    }

    handleChangeImage() {
        this.showUpload = true;
    }

    handleCloseModal() {
        this.showUpload = false;
    }
}
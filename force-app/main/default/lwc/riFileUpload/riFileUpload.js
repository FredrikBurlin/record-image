import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateImageName from '@salesforce/apex/riFileUploadController.updateImageName';

export default class RiFileUpload extends LightningElement {
    @api recordId;
    @api imageName;
    uploadedFiles;

    get acceptedFormats() {
        return ['.jpg', '.jpeg', '.png', '.gif'];
    }

    handleUploadFinished(event) {
        this.uploadedFiles = event.detail.files;
        console.log(this.uploadedFiles);
        this.changeImageName();
    }

    changeImageName() {
        updateImageName({ imageId: this.uploadedFiles[0].documentId, imageName: this.imageName})
            .then(() => {
                this.error = undefined;
                this.dispatchEvent(new CustomEvent('newimage'));
                this.successToast();
            })
            .catch(error => {
                this.error = 'Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;
                this.errorToast();
            });
    }

    successToast() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Successful Upload',
                variant: 'Success',
            }),
        );
    }

    errorToast() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: this.error,
                variant: 'Error',
            }),
        );
    }
}

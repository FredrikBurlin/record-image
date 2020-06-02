import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateImageName from '@salesforce/apex/riFileUploadController.updateImageName';

export default class RiFileUpload extends LightningElement {
    @api recordId;
    @api title;
    @api description;
    @api imageName;
    uploadedFiles;

    get acceptedFormats() {
        return ['.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp'];
    }

    renderedCallback() {
        this.changeButtonName();
    }

    changeButtonName() {
        var str = document.getElementsByClassName("slds-file-selector__body");
        console.log(str);
        var x = str.getElementsByTagName("span");
        for (var i = 0; i < x.length; i++) {
            console.log(x[i].innerHTML);
            var res = x[i].innerHTML.replace(/Upload Files/, "Upload Image");
            x[i].innerHTML = res;
        }
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

    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
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

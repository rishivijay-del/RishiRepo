import { LightningElement, api ,track } from 'lwc';
import uploadFileAndPost  from '@salesforce/apex/ActivityImageController.uploadFileAndPost';
 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PasteImageActivity extends LightningElement {
  @track imageData = '';
    @track imageSrc = '';
    @track hasImage = false;
    @api recordId;
    handlePaste(event) {
        event.preventDefault();
        const items = event.clipboardData.items;
        for (const item of items) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageData = reader.result.split(',')[1]; // Extract base64 data
                    this.imageSrc = reader.result; // Set the image source for preview
                    this.hasImage = true;
                };
                reader.readAsDataURL(file);
            }
        }
    }

    handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.imageData = reader.result.split(',')[1]; // Extract base64 data
                this.imageSrc = reader.result; // Set the image source for preview
                this.hasImage = true;
            };
            reader.readAsDataURL(file); 
        }
    }

    handleDragOver(event) {
        event.preventDefault();
    }

   handlePostImage() {
    const textAreaValue = this.template.querySelector('textarea').value; // Get the text from textarea
    if (this.imageData || textAreaValue) {
        const fileName = 'Pasted Image'; // Use a default or generated file name
        uploadFileAndPost({ fileName, base64Data: this.imageData, textContent: textAreaValue, leadId: this.recordId })
            .then(result => {
                // Handle successful response
                alert('Image and text posted successfully.');
                this.imageData = ''; // Clear image data after posting
                this.imageSrc = '';
                this.hasImage = false;
                this.template.querySelector('textarea').value = ''; // Clear the text area
            })
            .catch(error => {
                // Handle error
                alert('Error posting image and text: ' + error.body.message);
            });
    } else {
        alert('No content to post.');
    }
} 
}
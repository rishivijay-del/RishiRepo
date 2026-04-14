import { LightningElement, api } from 'lwc';
import testAccess from '@salesforce/apex/AccountFieldUpdateTest.updateAccountTest';

export default class AccountAccessButton extends LightningElement {
    result;

    handleClick() {
        const testAccountId = '001NS00000WRe70YAD'; // Replace with a valid Account Id in your org
        testAccess({ accountId: testAccountId })
            .then(response => {
                this.result = response;
            })
            .catch(error => {
                this.result = 'Caught error: ' + JSON.stringify(error);
            });
    }
}
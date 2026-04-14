import { LightningElement } from 'lwc';

export default class LanguageSelector extends LightningElement {
    // Define language options
    languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
        { label: 'Français', value: 'fr' },
    ];

    selectedLanguage = 'en'; // Default language

    handleLanguageChange(event) {
        this.selectedLanguage = event.detail.value;

        // Change the language dynamically by calling the updateUserLanguage method
        this.updateUserLanguage(this.selectedLanguage);
    }

    updateUserLanguage(language) {
        // Example method to switch the language on the page
        document.documentElement.lang = language; // This updates the HTML lang attribute
        location.reload();  // Reload the page to reflect language changes
    }
}
public with sharing class AccountFieldUpdateTest {
    
    @AuraEnabled
    public static void updateAccountTest(Id accountId) {
        Account acc = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId LIMIT 1];
        
        acc.Name = 'Updated Name3';
        acc.Phone = '123-456-7890'; // <- try removing access to this field
        acc.Website = 'https://example.com3';
        
       
        update acc;
         
    }
}
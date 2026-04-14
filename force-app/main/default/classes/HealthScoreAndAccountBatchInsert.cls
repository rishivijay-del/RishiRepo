global class HealthScoreAndAccountBatchInsert implements Database.Batchable<SObject> {

    global Database.QueryLocator start(Database.BatchableContext BC) {
        // Placeholder query for the batch to execute. We can leave this empty if no initial data query is needed.
        return Database.getQueryLocator([SELECT Id FROM Account LIMIT 1]);
    }

    global void execute(Database.BatchableContext BC, List<SObject> scope) {
        List<AccountBO__b> bigObjectRecords = new List<AccountBO__b>();
        List<Account> accountRecords = new List<Account>();

        // Prepare 10 sample records for the Big Object
        for (Integer i = 0; i < 10; i++) {
            // Create HealthScore__b (Big Object) record
            AccountBO__b bigObjectRecord = new AccountBO__b();
            bigObjectRecord.AccountName__c = 'Health Record ' + i;
            bigObjectRecord.AccountNumber__c = 'Hello' +i;
            bigObjectRecords.add(bigObjectRecord);

            // Create Account (Standard Object) record
            Account accountRecord = new Account();
            accountRecord.Name = 'Account ' + i;
            accountRecord.Phone = '123-456-789' + i; // Sample phone numbers
            accountRecord.Industry = 'Healthcare'; // Example industry

            accountRecords.add(accountRecord);
        }

        // Insert records into Big Object
        Database.insertImmediate(bigObjectRecords); // Inserting Big Object records

        // Insert records into Standard Account Object
        insert accountRecords; // Inserting Standard Account records
    }

    global void finish(Database.BatchableContext BC) {
        // Optional: Post-processing logic can go here
    }
}
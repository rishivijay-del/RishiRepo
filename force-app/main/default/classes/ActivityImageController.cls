public with sharing class ActivityImageController {
 
  @AuraEnabled
    public static void uploadFileAndPost(String fileName, String base64Data,String textContent,String leadId) {
        try {
            Blob fileBlob = EncodingUtil.base64Decode(base64Data);

           
            // Step 1: Create ContentVersion
            ContentVersion contentVersion = new ContentVersion();
            contentVersion.Title = fileName;
            contentVersion.PathOnClient = fileName;
            contentVersion.VersionData = fileBlob;
            insert contentVersion;
            System.debug('ContentVersion inserted successfully.');

            // Retrieve ContentDocumentId from ContentVersion
            String contentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id LIMIT 1].ContentDocumentId;
            System.debug('ContentDocumentId: ' + contentDocumentId);

            // Step 2: Create ContentDocumentLink
            ContentDocumentLink documentLink = new ContentDocumentLink();
            documentLink.ContentDocumentId = contentDocumentId;
            documentLink.LinkedEntityId = leadId; // Link to Lead record
            documentLink.ShareType = 'V'; // Viewer access
            insert documentLink;
            System.debug('ContentDocumentLink inserted successfully.');

            FeedItem feedItem = new FeedItem();
            feedItem.ParentId = leadId; // Post to the Lead record’s feed
            feedItem.Type = 'TextPost'; // Use TextPost type for HTML content
            String imageUrl = 'sfdc://' + contentDocumentId;
            feedItem.Body = '<p>' + textContent + '</p><p><img src="' + imageUrl + '" alt="pasted_image.png"></img></p>';
            feedItem.IsRichText = true;
            insert feedItem;


        } catch (Exception e) {
            System.debug('Error occurred: ' + e.getMessage());
            throw e; // Re-throw exception to the caller
        }
    }
}
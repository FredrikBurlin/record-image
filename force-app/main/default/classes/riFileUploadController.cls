public with sharing class riFileUploadController {

    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getImageFileCached(Id recordId, String imageName) {
        return  getVersionIds(recordId, imageName);
    }

    @AuraEnabled
    public static List<ContentVersion> getImageFile(Id recordId, String imageName) {
        return  getVersionIds(recordId, imageName);
    }

    private static List<ContentVersion> getVersionIds(Id recordId, String imageName) {
        List<ContentDocumentLink> contentLinks = [
            SELECT LinkedEntityId, ContentDocumentId
            FROM ContentDocumentLink
            WHERE LinkedEntityId =: recordId ];

        List<Id> contentIds = new List<Id>();
        for(ContentDocumentLink cdl: contentLinks){
            contentIds.add(cdl.ContentDocumentId);
        }

        List<ContentDocument> contents =[
            SELECT Id
            FROM ContentDocument
            WHERE Id IN: contentIds
            AND Title =: imageName];

        return [
            SELECT Id, Title
            FROM ContentVersion
            WHERE ContentDocumentId IN :contents
            LIMIT 1];
    }

    @AuraEnabled
    public static void updateImageName(String imageId, String imageName){
        List<ContentDocument> contents = [
            SELECT Id
            FROM ContentDocument
            WHERE Id =: imageId
            AND CreatedById =: UserInfo.getUserId()];
        for( ContentDocument cd : contents){
            cd.Title = imageName;
        }
        update contents;
    }
}
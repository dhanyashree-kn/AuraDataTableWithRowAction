public with sharing class DataTableWithRowActionController {
    
    @AuraEnabled(cacheable=true)
    public static list<sObject> getRecords(String sObjectType) {
        
        String query = 'Select Id, Name, Phone, Email  From ' +  sObjectType + ' LIMIT 10';
        list<sObject> queryResult = Database.query(query);
        return queryResult;
    }
    @AuraEnabled 
    public static void deleteRecord(String recordId) {
        delete [Select Id From Contact where Id =: recordId];
    }
}
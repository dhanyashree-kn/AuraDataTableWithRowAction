({
	getRecords : function(component) {
		
        var action = component.get('c.getRecords');
        action.setParams({"sObjectType" : component.get("v.sObjectType")});
        action.setCallback(this, function(response) {
        	var state = response.getState();
        	if(state == "SUCCESS") {
            	component.set("v.data", response.getReturnValue());
        	}                
        
        });
        $A.enqueueAction(action);
	},
    
    deleteSelectedRecord : function(component, row) {
        
        var rows = component.get("v.data");
        var action = component.get("c.deleteRecord");
        action.setParams({"recordId" : row.Id});       
        $A.enqueueAction(action);
        
        var rowIndex = rows.indexOf(row);
        rows.splice(rowIndex, 1);
        component.set("v.data", rows);
        var showToastEvent = $A.get("e.force:showToast");
        showToastEvent.setParams({
            "title" : "Record Deleted",
            "message" : "Record Deleted",
            "variant" : "Success"
        });
        showToastEvent.fire();     
    }
})
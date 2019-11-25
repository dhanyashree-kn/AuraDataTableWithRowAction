({
	doInit : function(component, event, helper) {
        
        var actions = [
            {label: "Show Details", name: "show_details"},
            {label: "Delete", name:"delete"}
        ];
        var columns = [
            {label: "Name", fieldName: "Name", type:"text"},
            {label: "Phone", fieldName: "Phone", type: "phone"},
            {label: "Email", fieldName: "Email", type: "email"},
            {type: "action" , typeAttributes : {rowActions: actions}}
		];
        
        component.set("v.columns", columns);        
        helper.getRecords(component);
	},
    handleRowAction : function(component, event, helper) {
 
        var action = event.getParam("action");
        var row = event.getParam("row");
        component.set("v.contactDetail", row);
      	
        switch(action.name) {
            case 'show_details' :
            var navEvent = $A.get("e.force:navigateToSObject");
            navEvent.setParams({
                "recordId" : row.Id,
                "slideDevName" : "detail"
            });
            navEvent.fire();
            break;
                
            case 'delete' :
                console.log('delete');
                component.set("v.showModal", true);
                break;
        }      
    },
    
    closeModal : function(component, event, helper) {
        component.set("v.showModal", false);
    },
    proceedDelete : function(component, event, helper) {
        var row = component.get("v.contactDetail");
        helper.deleteSelectedRecord(component, row);
        component.set("v.showModal", false);
    }
})
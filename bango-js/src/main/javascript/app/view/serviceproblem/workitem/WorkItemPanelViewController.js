Ext.define('Spm.view.serviceproblem.workitem.WorkItemPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workItemPanel',

    onSwitchWorkItemPanel: function (serviceProblem) {
        var layout = this.getView().getLayout();

        if (serviceProblem.hasWorkItem()) {
            layout.setActiveItem(1);
        } else {
            layout.setActiveItem(0);
        }
    }

});

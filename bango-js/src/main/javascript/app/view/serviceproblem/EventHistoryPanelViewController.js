Ext.define('Spm.view.serviceproblem.EventHistoryPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventHistoryPanel',

    listen: {
        controller: {
            serviceProblemTab: {
                serviceProblemLoaded: 'onServiceProblemLoaded'
            }
        }
    },

    onServiceProblemLoaded: function(serviceProblemId) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.load({params: {serviceProblemId: serviceProblemId}});
    },

    onEventHistoryAddNote: function() {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        var dialog = this.getView().add(
            {
                xtype: 'addNoteDialog'
            }
        );

        //Ext.create('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {actionName: this.name, actionContext: serviceProblemTab}).show();
        dialog.show();
    },

    onEventHistoryRefresh: function () {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.reload();
    },

    onEventHistoryNotesFilter: function (button, filterActive) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');

        if (!filterActive) {
            eventHistoryStore.clearFilter();
        } else {
            eventHistoryStore.filter('eventType', 'Note');
        }
    }
});
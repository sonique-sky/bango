Ext.define('Spm.view.serviceproblem.EventHistoryPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventHistoryPanel',

    listen: {
        controller: {
            addNoteDialog: {
                eventHistoryNoteAdded: 'onEventHistoryNoteAdded'
            },
            serviceProblemTab: {
                serviceProblemLoaded: 'onServiceProblemLoaded'
            }
        }
    },

    onServiceProblemLoaded: function (serviceProblemId) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.load({params: {serviceProblemId: serviceProblemId}});
    },

    onEventHistoryNoteAdded: function (response) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.loadRawData(response, false);
    },

    onEventHistoryAddNote: function () {
        var dialog = this.getView().add({xtype: 'addNoteDialog'}
        );
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
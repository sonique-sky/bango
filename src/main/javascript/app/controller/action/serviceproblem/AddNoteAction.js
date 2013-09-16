Ext.define('Spm.controller.action.serviceproblem.AddNoteAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.AddNoteAction',

    statics: {
        ACTION_NAME: 'add-note'
    },

    requires: [
        'Spm.view.serviceproblem.eventhistory.AddNoteDialog'
    ],

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.AddNoteAction.ACTION_NAME
        })]);
    },

    startAction: function (serviceProblemTab) {
        Ext.create('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {actionName: this.name, actionContext: serviceProblemTab}).show();
    },

    finishAction: function (serviceProblemTab, noteText) {
        var eventHistoryItem = Ext.create('Spm.model.EventHistoryItem', {note: noteText});
        var operation = Spm.proxy.ApiOperation.eventHistoryAddNote({records: [eventHistoryItem], params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}})

        Spm.proxy.EventHistoryApiProxy.update(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.eventHistoryPanel.loadWith(operation.getResultSet().records);
            }
        }, this);
    }
});

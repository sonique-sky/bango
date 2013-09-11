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
        Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/eventHistory', serviceProblemTab.getServiceProblem().serviceProblemId()),
                    jsonData: {noteText: noteText},
                    success: function (response) {
                        serviceProblemTab.eventHistoryPanel.loadWith(response);
                    }
                }
        );
    }
});

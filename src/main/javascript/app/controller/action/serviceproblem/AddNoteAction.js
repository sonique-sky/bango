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
            name: Spm.controller.action.serviceproblem.AddNoteAction.ACTION_NAME
        })]);
    },

    startAction: function (serviceProblemTab) {
        Ext.create('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {actionContext: serviceProblemTab}).show();
    },

    finishAction: function (serviceProblemTab, noteText) {
        console.log(arguments);
        Ext.Ajax.request(
                {
                    url: 'api/serviceproblem/add-note',
                    params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId(), noteText: noteText},
                    success: function (response) {
                        serviceProblemTab.eventHistoryPanel.loadWith(response);
                    }
                }
        );
    }
});

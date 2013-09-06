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

    startAction: function(serviceProblemTab) {
        Ext.create('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {parentServiceProblemTab: serviceProblemTab}).show();
    },

    finishAction: function (serviceProblemTab) {
        console.log(arguments);
    }
});

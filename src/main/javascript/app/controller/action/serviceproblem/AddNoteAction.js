Ext.define('Spm.controller.action.serviceproblem.AddNoteAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.AddNoteAction',

    statics: {
        ACTION_NAME: 'add-note'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.controller.action.serviceproblem.AddNoteAction.ACTION_NAME
        })]);
    },

    startAction: function(serviceProblemTab) {
        console.log('startAction');
    },

    finishAction: function (serviceProblemTab) {
    }
});

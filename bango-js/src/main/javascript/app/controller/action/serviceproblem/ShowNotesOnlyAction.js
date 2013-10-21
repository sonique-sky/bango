Ext.define('Spm.controller.action.serviceproblem.ShowNotesOnlyAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.ShowNotesOnlyAction',

    statics: {
        ACTION_NAME: 'show-notes-only'
    },

    constructor: function () {
        this.callParent([{
            name: Spm.action.ShowNotesOnlyAction.ACTION_NAME,
            tooltip: 'Show notes only',
            iconCls: 'icon-show-notes-only',
            id: Ext.id(this, 'show-notes-only-')
        }]);
    }

});

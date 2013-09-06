Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.addNoteDialog',

    height: 350,
    width: 600,
//    iconCls: 'icon-bulk-transfer',
    title: 'Add Note',

    config: {
        actionContext: undefined
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            collectFn: this.getNoteToAdd,
            acceptButtonText: 'Add Note',
//            acceptButtonDefaultDisabled: true,
            content: {
                xtype: 'textareafield',
                name: 'note'
            }
        });

        me.callParent(arguments);
    },

    getNoteToAdd: function () {
        return [Spm.action.AddNoteAction.ACTION_NAME, this.actionContext, this.down('textareafield').getValue()];
    }
});
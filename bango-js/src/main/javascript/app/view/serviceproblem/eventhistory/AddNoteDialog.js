Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {
    extend: 'Spm.view.component.ActionDialog',
    alias: 'widget.addNoteDialog',

    height: 350,
    width: 600,
//    iconCls: 'icon-bulk-transfer',
    title: 'Add Note',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            acceptButtonText: 'Add Note',
//            acceptButtonDefaultDisabled: true,
            content: {
                xtype: 'textareafield',
                name: 'note'
            }
        });

        me.callParent(arguments);
    },

    doCollect: function () {
        return [this.down('textareafield').getValue()];
    }
});
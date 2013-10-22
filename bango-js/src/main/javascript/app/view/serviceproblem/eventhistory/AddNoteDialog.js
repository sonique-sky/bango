Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {
    extend: 'Spm.view.component.ActionDialog',
    alias: 'widget.addNoteDialog',

    height: 350,
    width: 600,
    title: 'Add Note',
    cls: 'add-note-dialog',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            acceptButtonText: 'Add Note',
            acceptButtonDefaultDisabled: true,
            content: {
                xtype: 'textareafield',
                allowBlank: false,
                name: 'note',
                listeners: {
                    validitychange: { fn: me.onValidityChange, scope: me}
                }
            }
        });

        me.callParent(arguments);
    },

    onValidityChange: function (form, valid) {
        this.setAcceptButtonDisabled(!valid);
    },

    doCollect: function () {
        return [this.down('textareafield').getValue()];
    }
});
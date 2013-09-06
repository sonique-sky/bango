Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.addNoteDialog',

    height: 250,
    width: 450,
//    iconCls: 'icon-bulk-transfer',
    title: 'Add Note',

    config: {
        parentServiceProblemTab: undefined
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            collectFn: this.getNoteToAdd,
            acceptButtonText: 'Add Note',
//            acceptButtonDefaultDisabled: true,
            content: {
            }
        });

        me.callParent(arguments);
    },

    getNoteToAdd: function () {
        return [Spm.action.AddNoteAction.ACTION_NAME, this.parentServiceProblemTab, 'Foo'];
    }
});
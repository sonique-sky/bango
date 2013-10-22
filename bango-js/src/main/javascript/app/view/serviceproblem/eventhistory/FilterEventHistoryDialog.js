Ext.define('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialog', {
    extend: 'Spm.view.component.ActionDialog',
    alias: 'widget.addNoteDialog',

    height: 350,
    width: 600,
    title: 'History Event Filter',
    cls: 'filter-event-history-dialog',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            acceptButtonText: 'Filter',
         //   acceptButtonDefaultDisabled: true,
            content: {
                xtype: 'grid',
                flex: 1,
                store: me.store,
                name: 'eventTypes',
                columns: [{text: 'EventType', dataIndex: 'eventType', width: "100%"}]
            }
        });

        me.callParent(arguments);
    },

    onValidityChange: function (form, valid) {
        this.setAcceptButtonDisabled(!valid);
    },

    doCollect: function () {
        return [this.down('grid').getValue()];
    }
});
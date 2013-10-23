Ext.define('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialog', {
    extend: 'Spm.view.component.ActionDialog',
    alias: 'widget.filterEventHistoryDialog',

    height: 350,
    width: 600,
    title: 'History Event Filter',
    cls: 'filter-event-history-dialog',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            acceptButtonText: 'Filter',
            content: {
                xtype: 'grid',
                multiSelect: true,
                store: me.store,
                name: 'eventTypes',
                hideHeaders: true,
                columns: [
                    {dataIndex: 'eventType', width: "100%"}
                ]
            }
        });

        me.callParent(arguments);
    },

    onValidityChange: function (form, valid) {
        this.setAcceptButtonDisabled(!valid);
    },

    doCollect: function () {
        var selected = this.down('gridview').getSelectionModel().getSelection();

        return [Ext.Array.map(selected, function (model) {
            return model.get('eventType');
        })];
    }
});
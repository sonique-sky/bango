Ext.define('Spm.view.serviceproblem.eventhistory.ActionToolbar', {
    extend: 'Spm.view.component.ActionToolbar',
    alias: 'widget.eventHistoryActionToolbar',

    ui: 'custom-tool',

    initComponent: function () {
        var me = this;

        Ext.applyIf(this, {
            border: false,
            padding: 0,
            defaults: {padding: '1 5 1 5'},
            items: [
                {xtype: 'actionButton', actionName: 'filter-event-notes', scope: me, tooltip: 'Show notes only'},
                {xtype: 'actionButton', actionName: 'add-note', scope: me, tooltip: 'Add a note to this service problem'},
                {xtype: 'actionButton', actionName: 'refresh-events', scope: me, tooltip: 'Refresh history'},
                {xtype: 'actionButton', actionName: 'filter-events', scope: me, tooltip: 'Filter history by type'}
            ]
        });

        this.callParent(arguments);
    }
});

Ext.define('Spm.view.serviceproblem.eventhistory.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.eventHistoryActionToolbar',

    ui: 'custom-tool',

    initComponent: function () {
        Ext.applyIf(this, {
            border: false,
            padding: 0,
            defaults: {padding: '1 5 1 5'},
            items: [
                {xtype: 'button', iconCls: 'icon-filter-event-notes', tooltip: 'Show notes only'},
                this.registeredActions.getByKey('add-note'),
                this.registeredActions.getByKey('refresh-events'),
                {xtype: 'button', iconCls: 'icon-filter-events', tooltip: 'Filter history by type'}
            ]
        });

        this.callParent(arguments);
    }
});

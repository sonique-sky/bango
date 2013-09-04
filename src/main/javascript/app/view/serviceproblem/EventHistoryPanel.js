Ext.define('Spm.view.serviceproblem.EventHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventHistoryPanel',

    title: 'Event History',
    config: {
        idSuffix: undefined
    },

    initComponent: function () {
        Ext.applyIf(this, {
            tools: [
                Spm.view.component.ActionButton.toolBarButton('filter-event-notes', this.idSuffix, this, 'Show notes only', {padding: '2 5 2 5'}),
                Spm.view.component.ActionButton.toolBarButton('add-note', this.idSuffix, this, 'Add a note to this service problem'),
                Spm.view.component.ActionButton.toolBarButton('refresh-events', this.idSuffix, this, 'Refresh history'),
                Spm.view.component.ActionButton.toolBarButton('filter-events', this.idSuffix, this, 'Filter history by type')
            ],
            items: [
                {
                    xtype: 'panel'
                }
            ]
        });

        this.callParent(arguments);
    }

});
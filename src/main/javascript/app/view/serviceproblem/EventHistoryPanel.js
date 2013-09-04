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
                Spm.view.component.ActionButton.toolBarButton('filter-event-notes', this.idSuffix, this, 'Show notes only', {padding: '1 5 1 5'}),
                Spm.view.component.ActionButton.toolBarButton('add-note', this.idSuffix, this, 'Add a note to this service problem', {padding: '1 5 1 5'}),
                Spm.view.component.ActionButton.toolBarButton('refresh-events', this.idSuffix, this, 'Refresh history', {padding: '1 5 1 5'}),
                Spm.view.component.ActionButton.toolBarButton('filter-events', this.idSuffix, this, 'Filter history by type', {padding: '1 5 1 5'})
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
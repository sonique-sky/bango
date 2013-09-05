Ext.define('Spm.view.serviceproblem.EventHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventHistoryPanel',

    requires:[
        'Spm.store.EventHistory'
    ],

    title: 'Event History',
    config: {
        idSuffix: undefined
    },
    ui: 'custom-tool',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            tools: [
                {
                    xtype: 'toolbar',
                    ui: 'custom-tool',
                    border: false,
                    padding: 0,
                    defaults: {padding: '1 5 1 5'},
                    items: [
                        {xtype: 'actionButton', actionName: 'filter-event-notes', scope: me, tooltip: 'Show notes only'},
                        {xtype: 'actionButton', actionName: 'add-note', scope: me, tooltip: 'Add a note to this service problem'},
                        {xtype: 'actionButton', actionName: 'refresh-events', scope: me, tooltip: 'Refresh history'},
                        {xtype: 'actionButton', actionName: 'filter-events', scope: me, tooltip: 'Filter history by type'}
                    ]
                }
            ],
            items: [
                {
                    xtype: 'grid',
                    columns: [
                        {text: 'Event Type', renderer: this.eventTypeRenderer},
                        {text: 'Created Date', dataIndex: 'createdDate'},
                        {text: 'Created By', dataIndex: 'createdBy'}
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    eventTypeRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var eventType = record.get('eventType');
        var note = record.get('note');
    }
});
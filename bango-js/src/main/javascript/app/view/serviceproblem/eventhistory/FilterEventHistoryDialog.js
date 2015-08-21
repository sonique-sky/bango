Ext.define('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.filterEventHistoryDialog',

    height: 350,
    width: 600,
    title: 'History Event Filter',
    cls: 'filter-event-history-dialog',

    controller: 'filterEventHistoryDialog',
    viewModel: {
        type: 'filterEventHistoryDialog'
    },

    reference: 'filterEventHistoryDialog',

    tbar: [
        {
            xtype: 'button',
            reference: 'selectAllClearAllButton',
            handler: 'onSelectAllClearAll'
        }
    ],

    items: [
        {
            id: 'selectedEventHistoryFilter',
            reference: 'eventTypeGrid',
            listeners: {
                viewReady: 'onGridViewReady',
                selectionchange: 'onGridSelectionChange'
            },
            xtype: 'grid',
            multiSelect: true,
            hideHeaders: true,
            columns: [
                {dataIndex: 'eventType', width: "100%"}
            ],
            overItemCls: 'x-item-over',
            bind: {
                store: '{eventTypes}'
            },
            trackOver: true,
            autoScroll: true,
            margin: 5,
            border: 1,
            style: {
                borderColor: '#bcb1b0',
                borderStyle: 'solid'
            }
        }
    ]
});
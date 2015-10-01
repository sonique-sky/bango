Ext.define('Spm.view.serviceproblem.eventhistory.filter.FilterEventHistoryDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.filterEventHistoryDialog',

    requires: [
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Spm.view.serviceproblem.eventhistory.filter.FilterEventHistoryDialogViewController',
        'Spm.view.serviceproblem.eventhistory.filter.FilterEventHistoryDialogViewModel'
    ],

    height: 350,
    width: 600,
    title: 'History Event Filter',
    cls: 'filter-event-history-dialog',

    controller: 'filterEventHistoryDialog',
    viewModel: {type: 'filterEventHistoryDialog'},

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
Ext.define('Spm.view.serviceproblem.eventhistory.EventHistoryPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.eventHistoryPanel',

    requires: [
        'Ext.grid.feature.RowBody'
    ],

    controller: 'eventHistoryPanel',
    viewModel: {type: 'eventHistoryPanel'},
    reference: 'eventHistoryPanel',

    listeners: {
        serviceProblemLoaded: 'onServiceProblemLoaded'
    },

    bind: {
        store: '{eventHistory}'
    },

    title: 'Event History',
    iconCls: 'icon-event-history',
    layout: 'fit',
    flex: 1,

    ui: 'custom-tool',
    overflowY: 'auto',
    disableSelection: true,

    tools: [
        {
            xtype: 'toolbar',
            ui: 'custom-tool',
            items: [
                {
                    xtype: 'button',
                    tooltip: 'Show notes only',
                    iconCls: 'icon-show-notes-only',
                    handler: 'onEventHistoryNotesOnly',
                    bind: {
                        pressed: '{notesOnlyFilterActive}'
                    }
                },
                {
                    xtype: 'button',
                    tooltip: 'Add a note to this service problem',
                    iconCls: 'icon-add-note',
                    handler: 'onEventHistoryAddNote'
                },
                {
                    xtype: 'button',
                    tooltip: 'Refresh history',
                    iconCls: 'icon-refresh-history',
                    handler: 'onEventHistoryRefresh'
                },
                {
                    xtype: 'button',
                    tooltip: 'Filter history by type',
                    iconCls: 'icon-filter-events',
                    handler: 'onEventHistoryFilter'
                }
            ]
        }
    ],

    columns: [
        {
            text: 'Event Type',
            dataIndex: 'eventType',
            tdCls: 'event-type',
            flex: 1,
            resizable: false
        },
        {
            text: 'Created Date',
            dataIndex: 'createdDate',
            tdCls: 'event-created-date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'),
            resizable: false,
            align: 'center',
            width: 140
        },
        {
            text: 'Created By',
            dataIndex: 'createdBy',
            tdCls: 'event-created-by',
            resizable: false,
            align: 'center',
            width: 130
        }
    ],

    features: [
        {
            ftype: 'rowbody',
            getAdditionalData: function (data, rowIndex, record) {
                var headerCt = this.view.headerCt;
                var colspan = headerCt.getColumnCount();
                var rowBodyCls = ((rowIndex + 1) % 2 == 0 ? 'row-body-alt' : 'row-body');
                return {
                    rowBody: Ext.String.format('<div class="event-note {0}">{1}</div>', rowBodyCls, record.get('note')),
                    rowBodyCls: rowBodyCls,
                    rowBodyColspan: colspan
                };
            }
        }
    ]
});
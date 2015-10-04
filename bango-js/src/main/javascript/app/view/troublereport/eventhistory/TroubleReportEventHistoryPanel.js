Ext.define('Spm.view.troublereport.eventhistory.TroubleReportEventHistoryPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.troubleReportEventHistoryPanel',

    requires: [
        'Ext.grid.feature.RowBody',
        'Spm.view.troublereport.eventhistory.TroubleReportEventHistoryPanelViewController',
        'Spm.view.troublereport.eventhistory.TroubleReportEventHistoryPanelViewModel'
    ],

    controller: 'troubleReportEventHistoryPanel',
    viewModel: {type: 'troubleReportEventHistoryPanel'},
    reference: 'troubleReportEventHistoryPanel',

    bind: {
        store: '{troubleReportEventHistory}'
    },

    title: 'Event History',
    iconCls: 'icon-event-history',
    layout: 'fit',
    flex: 1,

    ui: 'custom-tool',
    overflowY: 'auto',
    disableSelection: true,

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

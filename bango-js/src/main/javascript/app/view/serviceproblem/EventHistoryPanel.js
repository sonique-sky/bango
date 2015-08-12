Ext.define('Spm.view.serviceproblem.EventHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventHistoryPanel',

    requires: [
        'Spm.store.EventHistory',
        'Ext.grid.feature.RowBody'
    ],

    layout: 'fit',
    title: 'Event History',
    flex: 1,

    tools: [
        //{
        //    xtype: 'eventHistoryActionToolbar'
        //}
    ],
    items: [
        {
            xtype: 'grid',
            overflowY: 'auto',
            disableSelection: true,
            viewConfig: {
                enableTextSelection: true,
                trackOver: false
            },
            bind: {
                store: '{eventHistory}'
            },
            columns: [
                {text: 'Event Type', dataIndex: 'eventType', flex: 1, tdCls: 'event-type', resizable: false},
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
        }
    ],

    reload: function () {
        this.store.reload();
    },

    bindTo: function (serviceProblem) {
        this.store.load({params: {serviceProblemId: serviceProblem.serviceProblemId()}})
    },

    loadWith: function (records) {
        this.store.loadRecords(records);
    },

    filterEventHistoryBy: function (filterFunction) {
        this.store.filterBy(filterFunction);
    },

    removeEventHistoryFilter: function () {
        this.store.removeFilter(null);
    },

    allEventTypes: function () {
        var eventTypes = [];
        this.store.queryBy(
            function () {
                return true;
            }
        ).each(
            function (historyItem) {
                eventTypes.push(historyItem.get('eventType'));
            }
        );
        return eventTypes;
    }
});
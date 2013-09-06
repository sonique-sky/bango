Ext.define('Spm.view.serviceproblem.EventHistoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventHistoryPanel',

    requires: [
        'Spm.store.EventHistory',
        'Spm.view.serviceproblem.eventhistory.ActionToolbar'
    ],

    layout: 'fit',
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
                    xtype: 'eventHistoryActionToolbar'
                }
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
                    store: Ext.create('Spm.store.EventHistory'),
                    columns: [
                        {text: 'Event Type', dataIndex: 'eventType', flex: 1, resizable: false},
                        {text: 'Created Date', dataIndex: 'createdDate', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i'), resizable: false, align: 'center', width: 140},
                        {text: 'Created By', dataIndex: 'createdBy', resizable: false, align: 'center', width: 130}
                    ],
                    features: [
                        {
                            ftype: 'rowbody',
                            getAdditionalData: function (data, rowIndex, record) {
                                var headerCt = this.view.headerCt;
                                var colspan = headerCt.getColumnCount();
                                var rowBodyCls = (rowIndex + 1) % 2 == 0 ? 'row-body-alt' : 'row-body';
                                return {
                                    rowBody: Ext.String.format('<div class={0}>{1}</div>', rowBodyCls, record.get('note')),
                                    rowBodyCls: rowBodyCls,
                                    rowBodyColspan: colspan
                                };
                            }
                        },
                        { ftype: 'rowwrap' }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    loadFor: function (serviceProblem) {
        this.down('grid').getStore().load({params: {serviceProblemId: serviceProblem.get('serviceProblemId')}})
    }
});
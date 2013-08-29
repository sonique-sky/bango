Ext.define('Spm.view.QueueTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queueTabContent',
    requires: ['Spm.view.QueueTabToolbar'],

    config: {
        queue: undefined,
        store: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-queue',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            title: me.queue.queueName(),
            id: 'queue-tab-' + me.queue.queueId(),
            dockedItems: [
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'stretch'},
                    dock: 'top',
                    defaults: {
                        border: 0

                    },
                    items: [
                        {
                            xtype: 'queueTabToolbar'
                        },
                        {
                            xtype: 'pagingtoolbar',
                            flex: 1.0,
                            store: me.store
                        },
                        {
                            xtype: 'tbspacer'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    store: me.store,
                    selType: 'checkboxmodel',
                    border: 0,
                    listeners: {
                        select: {fn: me.onServiceProblemSelected, scope: me},
                        deselect: {fn: me.onServiceProblemDeselected, scope: me}
                    },
                    columns: [
                        {text: 'Service Problem',
                            columns: [
                                {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
                                {text: 'Status', dataIndex: 'status'}
                            ]
                        },
                        {text: 'Work Item',
                            columns: [
                                {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: this.nestedPropertyRenderer}
                            ]
                        }
                    ]
                }
            ]
        })
        ;

        me.callParent(arguments);
    },

    onServiceProblemSelected: function () {
        this.down('button#bulk-transfer').setDisabled(false);
    },

    onServiceProblemDeselected: function () {
        if (!this.selectedServiceProblems().length) {
            this.down('button#bulk-transfer').setDisabled(true);
        }
    },

    nestedPropertyRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        function evaluateMe(dataIndex, associatedData) {
            var properties = dataIndex.split('.');
            var value = associatedData;

            Ext.Array.forEach(properties, function (property) {
                value = value[property]
            });

            return value;
        }

        var gridPanel = view.up('gridpanel');
        // Hack cos Ext offsets the colIndex value if selType property is 'checkboxmodel'
        if (gridPanel.selType == 'checkboxmodel') {
            colIndex--;
        }
        // End Hack
        var column = gridPanel.columns[colIndex];

        return evaluateMe(column.dataIndex, record.getAssociatedData());
    },

    selectedServiceProblems: function () {
        return this.down('gridpanel').getSelectionModel().getSelection();
    }
});
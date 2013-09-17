Ext.define('Spm.view.application.MyItemsTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.myItemsTabContent',
    title: 'My Items',
    iconCls: 'icon-my-items',
    initComponent: function () {
        this.store = Spm.store.ServiceProblems.myItemsServiceProblemStore();

        Ext.apply(this, {
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
                                    xtype: 'pagingtoolbar',
                                    flex: 1.0,
                                    store: this.store
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
                            store: this.store,
                            border: 0,
                            listeners: {
                                cellclick: {fn: this.onCellClicked, scope: this}
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
                                        {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer},
                                        {text: 'Agent', dataIndex: 'workItem.agent.displayName', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer}
                                    ]
                                }
                            ]
                        }
                    ]
                }
        );

        this.callParent(arguments);
    },

    loadMyItems: function () {
        this.store.load();
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent("serviceProblemClicked", record);
    }
});

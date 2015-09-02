Ext.define('Spm.view.admindashboard.queues.QueueAdminTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queueAdminTab',

    viewModel: 'queueAdminTab',
    controller: 'queueAdminTab',

    title: 'Queues',
    iconCls: 'icon-admin-dashboard',

    listeners: {
        activate: 'onActivated'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                xtype: 'button',
                padding: '5,5,5,5'
            },
            items: [
                {
                    tooltip: 'Update a Queue',
                    iconCls: 'icon-admin-queues-edit',
                    handler: 'updateQueue'
                },
                {
                    tooltip: 'Create a Queue',
                    iconCls: 'icon-admin-queues-create',
                    handler: 'createNewQueue'
                },
                {
                    tooltip: 'Delete a Queue',
                    iconCls: 'icon-admin-queues-delete',
                    handler: 'deleteQueue'
                },
                {
                    xtype: 'tbspacer'
                },
                {
                    xtype: 'pagingtoolbar',
                    border: 0,
                    bind: {
                        store: '{queues}'
                    }
                }
            ]
        }
    ],

    items: [
        {
            border: 0,
            xtype: 'gridpanel',
            reference: 'queueGrid',
            bind: {
                store: '{queues}'
            },

            columns: [
                {
                    text: 'Queue',
                    width: '20%',
                    dataIndex: 'name'
                },
                {
                    text: 'Pull SLA (Hours)',
                    width: '10%',
                    dataIndex: 'pullSla'
                },
                {
                    text: 'Allow Manual Transfer',
                    width: '15%',
                    dataIndex: 'manualTransferAllowed',
                    renderer: 'renderYesNoValue'
                },
                {
                    text: 'Create Default Work Item',
                    width: '15%',
                    dataIndex: 'defaultWorkItemCreated',
                    renderer: 'renderYesNoValue'
                },
                {
                    text: 'Domain',
                    width: '15%',
                    dataIndex: 'domain'
                }
            ]
        }
    ]
});

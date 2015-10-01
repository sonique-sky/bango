Ext.define('Spm.view.dashboard.admin.queues.QueueAdminTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueAdminTab',
    itemId: 'queueAdmin',

    requires: [
        'Spm.view.dashboard.admin.queues.QueueAdminTabViewController',
        'Spm.view.dashboard.admin.queues.QueueAdminTabViewModel'
    ],

    viewModel: {type: 'queueAdminTab'},
    controller: 'queueAdminTab',

    listeners: {
        activate: 'loadStore'
    },

    bind: {
        store: '{queues}'
    },

    title: 'Queues',
    iconCls: 'icon-admin-dashboard',
    border: 0,

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
});

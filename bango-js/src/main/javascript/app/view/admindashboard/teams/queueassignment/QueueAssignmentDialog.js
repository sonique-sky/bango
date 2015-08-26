Ext.define('Spm.view.admindashboard.teams.queueassignment.QueueAssignmentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.queueAssignmentDialog',

    title: 'Assign Team Queues',
    width: 610,
    height: 240,
    modal: true,
    bodyPadding: 5,

    viewModel: 'queueAssignmentDialog',
    controller: 'queueAssignmentDialog',

    listeners: {
        show: 'onShow'
    },
    items: [
        {
            xtype: 'panel',
            cls: 'queue-assignment-view-panel',
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            padding: '0,15,15,0',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    flex: 0.15,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        vertical: false
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Unassigned Queues',
                            style: 'text-align:center; display:block; font-weight:bold',
                            flex: 0.45
                        },
                        {
                            xtype: 'label',
                            flex: 0.05
                        },
                        {
                            xtype: 'label',
                            text: 'Assigned Queues',
                            style: 'text-align:center; display:block; font-weight:bold;',
                            flex: 0.45
                        }]
                },
                {
                    xtype: 'panel',
                    flex: 0.85,
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: {
                                type: 'hbox',
                                vertical: false,
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    reference: 'unassignedQueuesGrid',
                                    flex: 0.45,
                                    height: 140,
                                    border: true,
                                    hideHeaders: true,
                                    cls: 'unassigned-queues-view',
                                    bind: {
                                        store: '{unassignedQueues}'
                                    },
                                    columns: [
                                        {
                                            dataIndex: 'name',
                                            scrollable: true,
                                            flex: 1
                                        }
                                    ],
                                    selModel: {
                                        selType: 'rowmodel',
                                        mode: 'MULTI'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    flex: 0.05,
                                    height: 140,
                                    border: false,
                                    cls: 'queue-assignment-button-panel',
                                    items: [{
                                        xtype: 'panel',
                                        border: false,
                                        layout: {
                                            type: 'vbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-add-all',
                                                tooltip:'Add all',
                                                border: false,
                                                handler: 'assignAllQueues'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-add',
                                                tooltip:'Add selected',
                                                border: false,
                                                handler: 'assignSelectedQueues'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-remove',
                                                tooltip:'Remove selected',
                                                border: false,
                                                handler: 'removeAssignedQueues'
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-remove-all',
                                                tooltip:'Remove all',
                                                border: false,
                                                handler: 'removeAllAssignedQueues'
                                            }
                                        ]
                                    }]
                                },
                                {
                                    xtype: 'gridpanel',
                                    reference: 'assignedQueuesGrid',
                                    flex: 0.40,
                                    border: true,
                                    height: 140,
                                    hideHeaders: true,
                                    cls: 'assigned-queues-view',
                                    bind: {
                                        store: '{assignedQueues}'
                                    },
                                    columns: [
                                        {
                                            dataIndex: 'name',
                                            scrollable: true,
                                            flex: 1
                                        }
                                    ],
                                    selModel: {
                                        selType: 'rowmodel',
                                        mode: 'MULTI'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    ]
});
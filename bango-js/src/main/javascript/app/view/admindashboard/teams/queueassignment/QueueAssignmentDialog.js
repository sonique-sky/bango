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
        show : 'onShow'
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
                                    xtype: 'dataview',
                                    flex: 0.45,
                                    height: 140,
                                    border: true,
                                    itemSelector: 'div.queue',
                                    scrollable: true,
                                    cls: 'unassigned-queues-view',
                                    overItemCls: 'x-item-over',
                                    tpl: [
                                        '<div id="unassigned-queues-group">',
                                        '   <tpl for=".">',
                                        '      <div id="unassigned-queue-{name}" class="queue x-view-item">{name}</div>',
                                        '   </tpl>',
                                        '</div>'
                                    ],
                                    bind: {
                                        store: '{allQueues}'
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
                                                border: false
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-add',
                                                border: false
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-remove',
                                                border: false
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-admin-assign-remove-all',
                                                border: false
                                            }
                                        ]
                                    }]
                                },
                                {
                                    xtype: 'dataview',
                                    flex: 0.40,
                                    border: true,
                                    height: 140,
                                    itemSelector: 'div.queue',
                                    scrollable: true,
                                    cls: 'assigned-queues-view',
                                    overItemCls: 'x-item-over',
                                    tpl: [
                                        '<div id="assigned-queues-group">',
                                        '   <tpl for=".">',
                                        '      <div id="assigned-queue-{name}" class="queue x-view-item">{name}</div>',
                                        '   </tpl>',
                                        '</div>'
                                    ]
                                    //store: '{assignedQueues}'
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    ]
});
Ext.define('Spm.view.admindashboard.teams.queueassignment.QueueAssignmentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.queueAssignmentDialog',

    title: 'Assign Team Queues',
    width: 610,
    height: 235,
    modal: true,

    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            padding: 10,
            dockedItems: [{
                xtype: 'panel',
                dock: 'top',
                height: 30,
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'label',
                        text: 'Unassigned Queues',
                        width: '50%',
                        align: 'middle'
                    },
                    {
                        xtype: 'label',
                        text: 'Assigned Queues',
                        width: '50%',
                        align: 'middle'
                    }]
            }],
            items: [
                {
                    xtype: 'dataview',
                    width: '47%',
                    cls: 'queue-assignment-view',
                    itemSelector: 'div.queue',
                    overItemCls: 'x-item-over',
                    border: 1,
                    tpl: [
                        '<div id="unassigned-queues-group">',
                        '   <tpl for=".">',
                        '      <div id="unassigned-queue-{name}" class="queue x-view-item">{name}</div>',
                        '   </tpl>',
                        '</div>'
                    ]
                    //store: '{unassignedQueues}'
                },
                {
                    xtype: 'panel',
                    width: '6%',
                    height: '100%',
                    layout: {
                        type: 'vbox',
                        padding: 2,
                        align: 'middle',
                        vertical: true
                    },
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'icon-admin-assign-add-all'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-admin-assign-add'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-admin-assign-remove'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-admin-assign-remove-all'
                        }
                    ]

                },
                {
                    xtype: 'dataview',
                    width: '47%',
                    border: 1,
                    cls: 'queue-assignment-view',
                    itemSelector: 'div.queue',
                    overItemCls: 'x-item-over',
                    tpl: [
                        '<div id="assigned-queues-group">',
                        '   <tpl for=".">',
                        '      <div id="assigned-queue-{name}" class="queue x-view-item">{name}</div>',
                        '   </tpl>',
                        '</div>'
                    ],
                    //store: '{assignedQueues}'
                }
            ]
        }
    ]
})
;
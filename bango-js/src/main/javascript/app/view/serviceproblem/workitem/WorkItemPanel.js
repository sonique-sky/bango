Ext.define('Spm.view.serviceproblem.workitem.WorkItemPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workItemPanel',

    controller: 'workItemPanel',
    reference: 'workItemPanel',

    layout: 'card',
    title: 'Work Item',
    frame: true,
    fieldDefaults: {
        disabled: true
    },

    bind: {
        iconCls: '{assignedStateIconClass}'
    },

    listeners: {
        switchWorkItem: 'onSwitchWorkItemPanel'
    },

    items: [
        {
            xtype: 'container',
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            height: 87,
            items: [
                {xtype: 'label', cls: 'no-work-item-text', text: 'No Work Item Exists for this Service Problem'}
            ]
        },
        {
            xtype: 'container',
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    defaults: {
                        layout: {type: 'form', labelWidth: 110},
                        defaults: {readOnly:true}
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'datefield',
                                    bind: {
                                        value: '{workItem.createdDate}'
                                    },
                                    fieldLabel: 'Created Date',
                                    altFormats: 'd/m/Y H:i:s',
                                    format: 'd-m-Y H:i',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{workItem.priority}'
                                    },
                                    fieldLabel: 'Priority'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0, 0, 0 3',
                            items: [
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{workItem.status}'
                                    },
                                    fieldLabel: 'Status'
                                },
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{workItem.agent.displayName}'
                                    },
                                    fieldLabel: 'Assigned Agent'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0, 0, 0 3',
                            items: [
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{workItem.assignmentType}'
                                    },
                                    fieldLabel: 'Type'
                                },
                                {
                                    xtype: 'datefield',
                                    bind: {
                                        value: '{workItem.reminderTime}'
                                    },
                                    fieldLabel: 'Reminder',
                                    altFormats: 'd/m/Y H:i:s',
                                    format: 'd-m-Y H:i',
                                    hideTrigger: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {type: 'form', labelWidth: 110},
                    defaults: {readOnly:true},
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Action',
                            bind: {
                                value: '{workItem.action.description}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
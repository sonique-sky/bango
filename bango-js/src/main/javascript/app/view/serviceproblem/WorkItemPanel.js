Ext.define('Spm.view.serviceproblem.WorkItemPanel', {
    extend: 'Spm.view.component.AssociationCapableForm',
    alias: 'widget.workItemPanel',

    layout: 'card',
    title: 'Work Item',
    frame: true,
    fieldDefaults: {
        disabled: true
    },
    reference: 'workItemPanel',

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
                        layout: {type: 'form', labelWidth: 110}
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'datefield',
                                    bind: {
                                        value: '{serviceProblem.workItem.createdDate}'
                                    },
                                    fieldLabel: 'Created Date',
                                    altFormats: 'd/m/Y H:i:s',
                                    format: 'd-m-Y H:i',
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{serviceProblem.workItem.priority}'
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
                                        value: '{serviceProblem.workItem.status}'
                                    },
                                    fieldLabel: 'Status'
                                },
                                {
                                    xtype: 'textfield',
                                    bind: {
                                        value: '{serviceProblem.workItem.agent.details.firstName} {serviceProblem.workItem.agent.details.lastName}'
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
                                        value: '{serviceProblem.workItem.assignmentType}'
                                    },
                                    fieldLabel: 'Type'
                                },
                                {
                                    xtype: 'datefield',
                                    bind: {
                                        value: '{serviceProblem.workItem.reminderTime}'
                                    },
                                    fieldLabel: 'Reminder',
                                    format: 'd/m/y H:i',
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
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Action',
                            bind: {
                                value: '{serviceProblem.workItem.action}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
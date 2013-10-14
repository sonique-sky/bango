Ext.define('Spm.view.serviceproblem.WorkItemPanel', {
    extend: 'Spm.view.component.AssociationCapableForm',
    alias: 'widget.workItemPanel',

    layout: 'card',
    title: 'Work Item',
    frame: true,
    fieldDefaults: {
        disabled: true
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            itemId: 'workItemPanel',
            items: [
                {
                    itemId: 'workItemPanelWithNoData',

                    xtype: 'container',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    height: 86,
                    items: [
                        {xtype: 'label', cls: 'no-work-item-text', text: 'No Work Item Exists for this Service Problem'}
                    ]
                },
                {
                    itemId: 'workItemPanelWithData',
                    xtype: 'container',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 0,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            defaults: {
                                layout: 'form'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    labelWidth: 110,
                                    flex: 1,
                                    fieldDefaults: {
                                        labelWidth: 110
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'createdDate',
                                            fieldLabel: 'Created Date',
                                            format: 'd/m/y H:i',
                                            hideTrigger : true
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'priority',
                                            fieldLabel: 'Priority'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    margins: '0, 0, 0 3',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'status',
                                            fieldLabel: 'Status'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'agent.displayName',
                                            fieldLabel: 'Assigned Agent'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    flex: 1,
                                    margins: '0, 0, 0 3',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'type',
                                            fieldLabel: 'Type'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'reminder',
                                            fieldLabel: 'Reminder'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
                            layout: 'form',
                            fieldDefaults: {
                                labelWidth: 110
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Action',
                                    name: 'action'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    bindTo: function (serviceProblem) {
        if (serviceProblem.hasWorkItem()) {
            this.getLayout().setActiveItem('workItemPanelWithData');
            this.loadRecord(serviceProblem.workItem());
        } else {
            this.getLayout().setActiveItem('workItemPanelWithNoData');
        }
    }
});
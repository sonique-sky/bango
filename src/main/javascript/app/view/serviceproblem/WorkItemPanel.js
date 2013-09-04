Ext.define('Spm.view.serviceproblem.WorkItemPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workItemPanel',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Work Item',
    frame: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            itemId: 'workItemPanel',
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Created Date'
                                },
                                {
                                    xtype: 'textfield',
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
                                    fieldLabel: 'Type'
                                },
                                {
                                    xtype: 'textfield',
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
                            fieldLabel: 'Action'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
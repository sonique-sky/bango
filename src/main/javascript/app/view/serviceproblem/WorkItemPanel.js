Ext.define('Spm.view.serviceproblem.WorkItemPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workItemPanel',

    layout: {
        align: 'stretch',
        padding: 5,
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
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            flex: 1,
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
                    layout: {
                        type: 'fit'
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
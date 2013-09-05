Ext.define('Spm.view.serviceproblem.ServiceProblemTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTabContent',

    requires: [
        'Spm.view.serviceproblem.ActionToolbar',
        'Spm.view.serviceproblem.WorkItemPanel',
        'Spm.view.serviceproblem.ServiceProblemPanel',
        'Spm.view.serviceproblem.EventHistoryPanel'
    ],

    config: {
        serviceProblemId: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-sp-unassigned',

    initComponent: function () {
        var me = this;

        Ext.applyIf(this, {
            title: 'Service Problem [' + me.serviceProblemId + ']',
            id: 'service-problem-tab-' + me.serviceProblemId,
            layout: 'card',
            dockedItems: [
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'stretch'},
                    dock: 'top',
                    defaults: {
                        border: 0
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'buttongroup',
                                    title: 'View',
                                    defaults: {
                                        xtype: 'button',
                                        toggleGroup: 'panelToggle',
                                        handler: me.switchView,
                                        scope: me
                                    },
                                    items: [
                                        {
                                            text: 'Service Problem',
                                            itemId: 'serviceProblem',
                                            pressed: true
                                        },
                                        {
                                            text: 'Trouble Report',
                                            itemId: 'troubleReport'
                                        }
                                    ]
                                }
                            ]},
                        {
                            xtype: 'serviceProblemTabToolbar',
                            idSuffix: me.serviceProblemId,
                            parentContainer: me
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'container',
                    layout: { type: 'vbox', align: 'stretch'},
                    itemId: 'serviceProblemPanel',
                    items: [
                        {
                            xtype: 'workItemPanel'
                        },
                        {
                            xtype: 'serviceProblemPanel'
                        },
                        {
                            xtype: 'eventHistoryPanel',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'form',
                    itemId: 'troubleReportPanel',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Trouble Report'
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },

    load: function(serviceProblem) {
        this.down('workItemPanel').loadRecord(serviceProblem.workItem());
        this.down('serviceProblemPanel').loadRecord(serviceProblem);
        this.down('eventHistoryPanel').loadFor(serviceProblem);

    },

    switchView: function (button) {
        this.getLayout().setActiveItem(button.itemId + 'Panel');
    }
})
;
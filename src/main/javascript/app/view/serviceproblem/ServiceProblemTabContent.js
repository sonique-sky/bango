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
        serviceProblem: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-sp-unassigned',

    workItemPanel: undefined,
    serviceProblemPanel: undefined,
    eventHistoryPanel: undefined,

    initComponent: function () {
        var me = this;

        var serviceProblemId = me.serviceProblem.serviceProblemId();

        this.workItemPanel = Ext.widget('workItemPanel');
        this.serviceProblemPanel = Ext.widget('serviceProblemPanel');
        this.eventHistoryPanel = Ext.widget('eventHistoryPanel', {actionContext: me});

        Ext.applyIf(this, {
            title: 'Service Problem [' + serviceProblemId + ']',
            id: 'service-problem-tab-' + serviceProblemId,
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
                                        allowDepress: false,
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
                            actionContext: me
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
                        this.workItemPanel,
                        this.serviceProblemPanel,
                        this.eventHistoryPanel
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

    load: function (serviceProblem) {
        this.serviceProblem = serviceProblem;

        this.workItemPanel.bindTo(serviceProblem);
        this.serviceProblemPanel.bindTo(serviceProblem);
        this.eventHistoryPanel.bindTo(serviceProblem);
    },

    switchView: function (button) {
        this.getLayout().setActiveItem(button.itemId + 'Panel');
    }
});
Ext.define('Spm.view.serviceproblem.ServiceProblemTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTabContent',

    requires: [
        'Spm.controller.action.serviceproblem.AddNoteAction',
        'Spm.controller.action.serviceproblem.RefreshAction',
        'Spm.controller.action.serviceproblem.RefreshEventHistoryAction',
        'Spm.controller.action.serviceproblem.PullServiceProblemAction',
        'Spm.controller.action.serviceproblem.HoldAndReleaseWorkItemAction',
        'Spm.controller.action.serviceproblem.FilterHistoryAction',
        'Spm.controller.action.serviceproblem.ShowNotesOnlyAction',
        'Spm.view.serviceproblem.ActionToolbar',
        'Spm.view.serviceproblem.WorkItemPanel',
        'Spm.view.serviceproblem.ServiceProblemPanel',
        'Spm.view.serviceproblem.EventHistoryPanel',
        'Ext.container.ButtonGroup'
    ],

    mixins: {
        isActionContext: 'Spm.controller.mixins.IsActionContext'
    },

    config: {
        serviceProblem: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-sp-unassigned',

    workItemPanel: undefined,
    serviceProblemPanel: undefined,
    eventHistoryPanel: undefined,

    constructor: function () {
        this.mixins.isActionContext.constructor.call(this);

        this.callParent(arguments);
    },

    initComponent: function () {
        var me = this;

        var registeredActions = me.actionContextManager.registerActionsFor(this, [
            'Spm.action.AddNoteAction',
            'Spm.action.RefreshAction',
            'Spm.action.RefreshEventHistoryAction',
            'Spm.action.PullServiceProblemAction',
            'Spm.action.HoldAndReleaseWorkItemAction',
            'Spm.action.FilterHistoryAction',
            'Spm.action.ShowNotesOnlyAction'
        ]);

        var serviceProblemId = me.serviceProblem.serviceProblemId();

        this.workItemPanel = Ext.widget('workItemPanel');
        this.serviceProblemPanel = Ext.widget('serviceProblemPanel');
        this.eventHistoryPanel = Ext.widget('eventHistoryPanel', {registeredActions: registeredActions});

        this.id = 'service-problem-tab-content-' + serviceProblemId;
        this.tabConfig = {id: 'service-problem-tab-' + serviceProblemId};

        Ext.applyIf(this, {
            title: 'Service Problem [' + serviceProblemId + ']',
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
                            id: 'view-toolbar',
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
                                            id:'view-service-problem',
                                            pressed: true
                                        },
                                        {
                                            text: 'Trouble Report',
                                            itemId: 'troubleReport',
                                            id:'view-trouble-report'
                                        }
                                    ]
                                }
                            ]},
                        {
                            xtype: 'serviceProblemTabToolbar',
                            registeredActions: registeredActions
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
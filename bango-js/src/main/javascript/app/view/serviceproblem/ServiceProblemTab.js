Ext.define('Spm.view.serviceproblem.ServiceProblemTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTab',

    border: 0,

    closable: true,
    iconCls: 'icon-sp-unassigned',

    viewModel: {type: 'serviceProblemTab'},
    controller: 'serviceProblemTab',

    bind: {
        title: '{serviceProblemTabTitle}'
    },

    //workItemPanel: undefined,
    //serviceProblemPanel: undefined,
    //eventHistoryPanel: undefined,

    layout: 'card',

    dockedItems: [
        {
            xtype: 'container',
            layout: {type: 'hbox', align: 'stretch'},
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
                                allowDepress: false
                                //handler: me.switchView,
                                //scope: me
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
                    ]
                },
                {
                    //xtype: 'serviceProblemTabToolbar',
                    //registeredActions: registeredActions
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
            layout: {type: 'vbox', align: 'stretch'},
            itemId: 'serviceProblemPanel',
            items: [
                {
                    xtype: 'workItemPanel'
                },
                {
                    xtype: 'serviceProblemPanel'
                }, {
                    xtype: 'eventHistoryPanel'
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
    ],

    //initComponent: function () {
    //var me = this;
    //
    //var registeredActions = me.actionContextManager.registerActionsFor(this, [
    //    'Spm.action.AddNoteAction',
    //    'Spm.action.RefreshAction',
    //    'Spm.action.RefreshEventHistoryAction',
    //    'Spm.action.PullServiceProblemAction',
    //    'Spm.action.HoldAndReleaseWorkItemAction',
    //    'Spm.action.FilterHistoryAction',
    //    'Spm.action.ShowNotesOnlyAction'
    //]);
    //
    //var serviceProblemId = me.serviceProblem.serviceProblemId();
    //
    //this.workItemPanel = Ext.widget('workItemPanel');
    //this.serviceProblemPanel = Ext.widget('serviceProblemPanel');
    //this.eventHistoryPanel = Ext.widget('eventHistoryPanel', {registeredActions: registeredActions});
    //
    //this.id = 'service-problem-tab-content-' + serviceProblemId;
    //this.tabConfig = {id: 'service-problem-tab-' + serviceProblemId};
    //
    //Ext.applyIf(this, {
    //    title: 'Service Problem [' + serviceProblemId + ']',
    //});
    //
    //this.callParent(arguments);
    //},

    //load: function (serviceProblem) {
    //    this.serviceProblem = serviceProblem;
    //
    //    this.workItemPanel.bindTo(serviceProblem);
    //    this.serviceProblemPanel.bindTo(serviceProblem);
    //    this.eventHistoryPanel.bindTo(serviceProblem);
    //},

    //switchView: function (button) {
    //    this.getLayout().setActiveItem(button.itemId + 'Panel');
    //}

});
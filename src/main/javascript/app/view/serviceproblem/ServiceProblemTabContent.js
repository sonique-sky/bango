Ext.define('Spm.view.serviceproblem.ServiceProblemTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTabContent',

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
                            xtype: 'button',
                            toggleGroup: 'panelToggle',
                            text: 'Service Problem',
                            itemId: 'serviceProblem',
                            handler: me.switchView,
                            pressed: true,
                            scope: me
                        },
                        {
                            xtype: 'button',
                            toggleGroup: 'panelToggle',
                            text: 'Trouble Report',
                            itemId: 'troubleReport',
                            handler: me.switchView,
                            scope: me
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'serviceProblemPanel',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Service Problem'
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

    switchView: function(button) {
        this.getLayout().setActiveItem(button.itemId + 'Panel');
    }
});
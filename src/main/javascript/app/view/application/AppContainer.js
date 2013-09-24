Ext.define('Spm.view.application.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Spm.view.navigation.NavigationPanel',
        'Spm.view.application.HeaderView',
        'Spm.view.application.MyItemsTabContent'
    ],

    hidden: true,
    cls: 'superman-app-container',
    itemId: 'appContainer',
    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    id: 'tab-panel'
                },
                {
                    xtype: 'navigationPanel',
                    region: 'west',
                    agentStatusActionContextManager: me.agentStatusActionContextManager,
                    searchesActionContextManager: me.searchesActionContextManager
                },
                {
                    xtype: 'headerView',
                    region: 'north'
                }
            ]
        });

        me.callParent(arguments);
    }

});
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
    id: 'superman-app-container',
    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'tabpanel',
            region: 'center',
            id: 'tab-panel'
        },
        {
            xtype: 'navigationPanel',
            region: 'west'
            //,
            //agentStatusActionContextManager: me.agentStatusActionContextManager,
            //searchesActionContextManager: me.searchesActionContextManager
        },
        {
            xtype: 'headerView',
            region: 'north'
        }
    ]

});
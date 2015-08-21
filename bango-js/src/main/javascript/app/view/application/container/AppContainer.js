Ext.define('Spm.view.application.container.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Spm.view.navigation.NavigationPanel',
        'Spm.view.application.header.AppHeader',
        'Spm.view.application.MyItemsTabContent'
    ],

    controller: 'appContainer',
    viewModel: {
        type: 'appContainer'
    },
    reference: 'appContainer',
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
            reference: 'tabPanel',
            region: 'center',
            id: 'tab-panel',
            padding: 2
        },
        {
            xtype: 'navigationPanel',
            region: 'west',
            padding: 2
        },
        {
            xtype: 'appHeader',
            region: 'north',
            border: 0
        }
    ]

});
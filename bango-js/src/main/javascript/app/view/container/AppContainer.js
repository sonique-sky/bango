Ext.define('Spm.view.container.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Ext.tab.Panel',
        'Ext.data.proxy.Rest',
        'Ext.layout.container.Border',
        'Spm.view.navigation.NavigationPanel',
        'Spm.view.header.AppHeader',
        'Spm.view.header.AppHeaderViewController',
        'Spm.store.MyItems',
        'Spm.view.myitems.MyItemsTabViewModel',
        'Spm.view.myitems.MyItemsTabViewController'
    ],

    controller: 'appContainer',
    viewModel: {type: 'appContainer'},
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
            padding: '0 5 0 5'
        },
        {
            xtype: 'navigationPanel',
            region: 'west',
            padding: '0 0 0 5'
        },
        {
            xtype: 'appHeader',
            region: 'north',
            border: 0
        }
    ]
});
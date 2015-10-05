Ext.define('Spm.view.container.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Ext.layout.container.Border',
        'Ext.tab.Panel',
        'Ext.ux.TabCloseMenu',
        'Spm.view.container.AppContainerViewController',
        'Spm.view.container.AppContainerViewModel',
        'Spm.view.header.AppHeader',
        'Spm.view.navigation.NavigationPanel'
    ],

    controller: 'appContainer',
    viewModel: {type: 'appContainer'},
    reference: 'appContainer',

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
            padding: '0 5 5 5',
            plugins: 'tabclosemenu'
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

Ext.define('Spm.view.navigation.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Spm.view.navigation.NavigationPanelViewController',
        'Spm.view.navigation.state.AgentState',
        'Spm.view.navigation.search.Search'
    ],

    controller: 'navigationPanel',

    listeners: {
        added: 'insertMyQueuesPanelIfRequired'
    },

    height: 730,
    width: 230,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    defaults: {
        padding: '0 0 5 0'
    },

    items: [
        {
            xtype: 'agentState'
        },
        {
            xtype: 'search'
        }
    ]
});
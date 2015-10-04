Ext.define('Spm.view.navigation.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Ext.layout.container.VBox',
        'Spm.view.navigation.NavigationPanelViewController',
        'Spm.view.navigation.search.Search',
        'Spm.view.navigation.state.AgentState'
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
        {xtype: 'agentState'},
        {xtype: 'search'}
    ]
});
Ext.define('Spm.view.navigation.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Spm.view.navigation.state.AgentState',
        'Spm.view.navigation.queues.Queues',
        'Spm.view.navigation.search.Search'
    ],

    height: 730,
    width: 200,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    items: [
        {
            xtype: 'agentState'
        },
        {
            xtype: 'myQueues',
            collapsible: true
        },
        {
            xtype: 'search',
            collapsible: true
        }
    ]

});
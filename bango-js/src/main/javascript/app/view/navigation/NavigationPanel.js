Ext.define('Spm.view.navigation.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Spm.view.navigation.state.AgentState',
        'Spm.view.navigation.state.AgentStateViewModel',
        'Spm.view.navigation.state.AgentStateViewController',
        'Spm.view.navigation.queues.Queues',
        'Spm.view.navigation.queues.QueuesViewController',
        'Spm.view.navigation.search.Search',
        'Spm.view.navigation.search.SearchViewModel',
        'Spm.view.navigation.search.SearchViewController'
    ],

    height: 730,
    width: 230,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    items: [
        {
            xtype: 'agentState',
            padding: '0 0 5 0'
        },
        {
            xtype: 'myQueues',
            collapsible: true,
            padding: '0 0 5 0'
        },
        {
            xtype: 'search',
            collapsible: true
        }
    ]
});
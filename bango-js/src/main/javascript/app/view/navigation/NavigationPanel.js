Ext.define('Spm.view.navigation.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Spm.view.navigation.state.AgentState',
        'Spm.view.navigation.MyQueuesPanel',
        'Spm.view.navigation.SearchPanel'
    ],

    height: 730,
    width: 200,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    items: [
        {
            xtype: 'agentState',
            //actionContextManager: me.agentStatusActionContextManager
        },
        //{
        //    xtype: 'myQueuesPanel',
        //    collapsible:true
        //},
        //{
        //    xtype: 'searchPanel',
        //    //actionContextManager: me.searchesActionContextManager,
        //    collapsible:true
        //}
    ]

});
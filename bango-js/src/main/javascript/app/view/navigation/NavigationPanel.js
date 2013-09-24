Ext.define('Spm.view.navigation.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Spm.view.navigation.AgentStatusPanel',
        'Spm.view.navigation.MyQueuesPanel',
        'Spm.view.navigation.SearchPanel'
    ],

    height: 730,
    width: 200,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults :{
                margin: '0 5 5 5'
            },
            items: [
                {
                    xtype: 'agentStatusPanel',
                    actionContextManager: me.agentStatusActionContextManager
                },
                {
                    xtype: 'myQueuesPanel',
                    collapsible:true
                },
                {
                    xtype: 'searchPanel',
                    actionContextManager: me.searchesActionContextManager,
                    collapsible:true
                }
            ]
        });

        me.callParent(arguments);
    }

});
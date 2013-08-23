Ext.define('Spm.view.NavigationPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.navigationPanel',

    requires: [
        'Spm.view.AgentStatusPanel',
        'Spm.view.MyQueuesPanel',
        'Spm.view.SearchPanel'
    ],

    height: 730,
    width: 197,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'agentStatusPanel'
                },
                {
                    xtype: 'myQueuesPanel',
                    flex: 1
                },
                {
                    xtype: 'searchPanel',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});
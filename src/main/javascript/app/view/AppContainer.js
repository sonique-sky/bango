Ext.define('Spm.view.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Spm.view.TabPanel',
        'Spm.view.NavigationPanel',
        'Spm.view.HeaderView'
    ],

    hidden: true,
    itemId: 'appContainer',
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabPanel',
                    region: 'center'
                },
                {
                    xtype: 'navigationPanel',
                    region: 'west'
                },
                {
                    xtype: 'headerView',
                    height: 60,
                    region: 'north'
                }
            ]
        });

        me.callParent(arguments);
    }

});
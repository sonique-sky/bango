Ext.define('Spm.view.SpmViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.spmViewport',

    requires: [
        'Spm.view.AppContainer'
    ],

    itemId: 'spmViewport',
    layout: {
        type: 'fit'
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'appContainer'
                }
            ]
        });

        me.callParent(arguments);
    }

});
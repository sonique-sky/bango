Ext.define('Spm.view.application.SpmViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.spmViewport',

    requires: [
        'Spm.view.application.AppContainer'
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
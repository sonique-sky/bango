Ext.define('Spm.view.queuedashboard.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueDashboardToolbar',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'tbtext',
                    text: 'Auto Refresh:'
                },
                {
                    xtype:'tbspacer',
                    flex: 1
                }
            ]
        });

        this.callParent(arguments);
    }
});
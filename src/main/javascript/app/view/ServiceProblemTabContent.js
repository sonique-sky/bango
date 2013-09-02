Ext.define('Spm.view.ServiceProblemTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.serviceProblemTabContent',

    config: {
        serviceProblemId: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-sp-unassigned',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            title: 'Service Problem [' + me.serviceProblemId + ']',
            id: 'service-problem-tab-' + me.serviceProblemId
        });

        me.callParent(arguments);
    }
});
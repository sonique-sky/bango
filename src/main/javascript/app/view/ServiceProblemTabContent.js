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
        Ext.applyIf(this, {
            title: 'Service Problem [' + this.serviceProblemId + ']',
            id: 'service-problem-tab-' + this.serviceProblemId
        });

        this.callParent(arguments);
    }
});
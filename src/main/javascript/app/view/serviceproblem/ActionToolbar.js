Ext.define('Spm.view.serviceproblem.ActionToolbar', {
    extend: 'Spm.view.component.ActionToolbar',
    alias: 'widget.serviceProblemTabToolbar',

    initComponent: function () {
        var me = this;

        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'buttongroup',
                    title: 'Service Problem',
                    defaults: {
                        padding: '2, 8, 2, 8'
                    },
                    items: [
                        {xtype: 'actionButton', actionName: 'refresh', scope: me, tooltip: 'Refresh'},
                        {xtype: 'actionButton', actionName: 'pull', scope: me, tooltip: 'Pull this item'},
                        {xtype: 'actionButton', actionName: 'hold', scope: me, tooltip: 'Hold this work item'},
                        {xtype: 'actionButton', actionName: 'reassign', scope: me, tooltip: 'Reassign service problem to another agent'},
                        {xtype: 'actionButton', actionName: 'transfer', scope: me, tooltip: 'Transfer to another queue'},
                        {xtype: 'actionButton', actionName: 'clear', scope: me, tooltip: 'Clear this service problem'},
                        {xtype: 'actionButton', actionName: 'line-test', scope: me, tooltip: 'Request a managed line test'},
                        {xtype: 'actionButton', actionName: 'feature-check', scope: me, tooltip: 'Request a feature check for this service'},
                        {xtype: 'actionButton', actionName: 'work-reminder', scope: me, tooltip: 'Set a work reminder'},
                        {xtype: 'actionButton', actionName: 'associate-msp', scope: me, tooltip: 'Associate this service problem to a MSP'}
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Trouble Report',
                    defaults: {
                        padding: '2, 8, 2, 8'
                    },
                    items: [
                        {xtype: 'actionButton', actionName: 'create-trouble-report', scope: me, tooltip: 'Create Trouble Report'},
                        {xtype: 'actionButton', actionName: 'amend-trouble-report', scope: me, tooltip: 'Amend Trouble Report'},
                        {xtype: 'actionButton', actionName: 'cancel-trouble-report', scope: me, tooltip: 'Cancel Trouble Report'},
                        {xtype: 'actionButton', actionName: 'confirm-equipment-disconnect', scope: me, tooltip: 'Confirm Equipment is Disconnected'}
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});
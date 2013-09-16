Ext.define('Spm.view.serviceproblem.ActionToolbar', {
    extend: 'Spm.view.component.ActionToolbar',
    alias: 'widget.serviceProblemTabToolbar',

    initComponent: function () {
        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'buttongroup',
                    title: 'Service Problem',
                    defaults: {
                        padding: '2, 8, 2, 8'
                    },
                    items: [
                        {xtype: 'actionButton', actionName: Spm.action.RefreshAction.ACTION_NAME, tooltip: 'Refresh'},
                        {xtype: 'actionButton', actionName: Spm.action.PullServiceProblemAction.ACTION_NAME, tooltip: 'Pull this item'},
                        {xtype: 'actionButton', actionName: Spm.action.HoldWorkItemAction.ACTION_NAME, tooltip: 'Hold this work item', disabled: true},
                        {xtype: 'actionButton', actionName: Spm.action.UnholdWorkItemAction.ACTION_NAME, tooltip: 'Unhold this work item', hidden: true, autoRender: true},
                        {xtype: 'actionButton', actionName: 'reassign', tooltip: 'Reassign service problem to another agent'},
                        {xtype: 'actionButton', actionName: 'transfer', tooltip: 'Transfer to another queue'},
                        {xtype: 'actionButton', actionName: 'clear', tooltip: 'Clear this service problem'},
                        {xtype: 'actionButton', actionName: 'line-test', tooltip: 'Request a managed line test'},
                        {xtype: 'actionButton', actionName: 'feature-check', tooltip: 'Request a feature check for this service'},
                        {xtype: 'actionButton', actionName: 'work-reminder', tooltip: 'Set a work reminder'},
                        {xtype: 'actionButton', actionName: 'associate-msp', tooltip: 'Associate this service problem to a MSP'}
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Trouble Report',
                    defaults: {
                        padding: '2, 8, 2, 8'
                    },
                    items: [
                        {xtype: 'actionButton', actionName: 'create-trouble-report', tooltip: 'Create Trouble Report'},
                        {xtype: 'actionButton', actionName: 'amend-trouble-report', tooltip: 'Amend Trouble Report'},
                        {xtype: 'actionButton', actionName: 'cancel-trouble-report', tooltip: 'Cancel Trouble Report'},
                        {xtype: 'actionButton', actionName: 'confirm-equipment-disconnect', tooltip: 'Confirm Equipment is Disconnected'}
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },

    showHold: function () {
        this.down('#' + Spm.action.HoldWorkItemAction.ACTION_NAME).setVisible(true);
        this.down('#' + Spm.action.UnholdWorkItemAction.ACTION_NAME).setVisible(false);
    },

    showUnhold: function () {
        this.down('#' + Spm.action.HoldWorkItemAction.ACTION_NAME).setVisible(false);
        this.down('#' + Spm.action.UnholdWorkItemAction.ACTION_NAME).setVisible(true);
    }
});
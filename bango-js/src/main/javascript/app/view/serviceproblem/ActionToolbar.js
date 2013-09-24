Ext.define('Spm.view.serviceproblem.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.serviceProblemTabToolbar',
    cls: 'action-toolbar',

    initComponent: function () {
        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'buttongroup',
                    title: 'Service Problem',
                    items: [
                        this.registeredActions.actionNamed(Spm.action.RefreshAction.ACTION_NAME),
                        this.registeredActions.actionNamed(Spm.action.PullServiceProblemAction.ACTION_NAME),
                        this.registeredActions.actionNamed(Spm.action.HoldAndReleaseWorkItemAction.ACTION_NAME),
                        {xtype: 'button', iconCls: 'icon-reassign', tooltip: 'Reassign service problem to another agent'},
                        {xtype: 'button', iconCls: 'icon-transfer', tooltip: 'Transfer to another queue'},
                        {xtype: 'button', iconCls: 'icon-clear', tooltip: 'Clear this service problem'},
                        {xtype: 'button', iconCls: 'icon-line-test', tooltip: 'Request a managed line test'},
                        {xtype: 'button', iconCls: 'icon-feature-check', tooltip: 'Request a feature check for this service'},
                        {xtype: 'button', iconCls: 'icon-work-reminder', tooltip: 'Set a work reminder'},
                        {xtype: 'button', iconCls: 'icon-associate-msp', tooltip: 'Associate this service problem to a MSP'}
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Trouble Report',
                    items: [
                        {xtype: 'button', iconCls: 'icon-create-trouble-report', tooltip: 'Create Trouble Report'},
                        {xtype: 'button', iconCls: 'icon-amend-trouble-report', tooltip: 'Amend Trouble Report'},
                        {xtype: 'button', iconCls: 'icon-cancel-trouble-report', tooltip: 'Cancel Trouble Report'},
                        {xtype: 'button', iconCls: 'icon-confirm-equipment-disconnect', tooltip: 'Confirm Equipment is Disconnected'}
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});
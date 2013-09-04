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
                        Spm.view.component.ActionButton.toolBarButton( 'refresh', this.idSuffix, this, 'Refresh'),
                        Spm.view.component.ActionButton.toolBarButton( 'pull', this.idSuffix, this, 'Pull this item'),
                        Spm.view.component.ActionButton.toolBarButton( 'hold', this.idSuffix, this, 'Hold this work item'),
                        Spm.view.component.ActionButton.toolBarButton( 'reassign', this.idSuffix, this, 'Reassign service problem to another agent'),
                        Spm.view.component.ActionButton.toolBarButton( 'transfer', this.idSuffix, this, 'Transfer to another queue'),
                        Spm.view.component.ActionButton.toolBarButton( 'clear', this.idSuffix, this, 'Clear this service problem'),
                        Spm.view.component.ActionButton.toolBarButton( 'line-test', this.idSuffix, this, 'Request a managed line test'),
                        Spm.view.component.ActionButton.toolBarButton( 'feature-check', this.idSuffix, this, 'Request a feature check for this service'),
                        Spm.view.component.ActionButton.toolBarButton( 'work-reminder', this.idSuffix, this, 'Set a work reminder'),
                        Spm.view.component.ActionButton.toolBarButton( 'associate-msp', this.idSuffix, this, 'Associate this service problem to a MSP')
                    ]
                },
                {
                    xtype: 'buttongroup',
                    title: 'Trouble Report',
                    defaults: {
                        padding: '2, 8, 2, 8'
                    },
                    items: [
                        Spm.view.component.ActionButton.toolBarButton( 'create-trouble-report', this.idSuffix, this, 'Create Trouble Report'),
                        Spm.view.component.ActionButton.toolBarButton( 'amend-trouble-report', this.idSuffix, this, 'Amend Trouble Report'),
                        Spm.view.component.ActionButton.toolBarButton( 'cancel-trouble-report', this.idSuffix, this, 'Cancel Trouble Report'),
                        Spm.view.component.ActionButton.toolBarButton( 'confirm-equipment-disconnect', this.idSuffix, this, 'Confirm Equipment is Disconnected')
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});
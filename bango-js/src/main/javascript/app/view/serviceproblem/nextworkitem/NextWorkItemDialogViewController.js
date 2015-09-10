Ext.define('Spm.view.serviceproblem.nextworkitem.NextWorkItemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.nextWorkItemDialog',

    onShow: function () {
        this.lookupReference('nextWorkItemForm').isValid();
    },

    onAccept: function () {
        if (this.lookupReference('nextWorkItemForm').isValid()) {
            var viewModel = this.getViewModel();
            var me = this.getView();
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/nextWorkItem', viewModel.serviceProblemId()),
                    method: 'POST',
                    jsonData: {
                        nextWorkItem: viewModel.nextWorkItem()
                    },
                    scope: this,
                    success: function () {
                        this.fireEvent('workItemUpdated', viewModel.serviceProblemId());
                        me.close();
                    }
                }
            );
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }

});

Ext.define('Spm.view.serviceproblem.nextworkitem.NextWorkItemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.nextWorkItemDialog',

    onShow: function () {
        this.lookupReference('nextWorkItemForm').isValid();
    },

    onAccept: function () {
        var me = this;
        var viewModel = me.getViewModel();
        var serviceProblemId = viewModel.serviceProblem().serviceProblemId();

        Ext.Ajax.request(
            {
                url: Ext.String.format('api/serviceProblem/{0}/nextWorkItem', serviceProblemId),
                method: 'POST',
                jsonData: {
                    nextWorkItem: viewModel.nextWorkItem()
                },
                scope: me,
                success: function () {
                    me.fireEvent('workItemUpdated', serviceProblemId);
                    me.closeView();
                }
            }
        );
    },

    onValidityChange: function (form, isValid) {
        this.getViewModel().set('acceptButtonDefaultDisabled', !isValid);
    }

});

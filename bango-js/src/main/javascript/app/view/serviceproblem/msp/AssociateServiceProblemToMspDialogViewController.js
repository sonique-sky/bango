Ext.define('Spm.view.serviceproblem.msp.AssociateServiceProblemToMspDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.associateServiceProblemToMspDialog',

    selectFirstRow: function (store) {
        var first = store.first();
        if (first) {
            this.lookupReference('mspGrid').setSelection(first);
            this.getViewModel().set('acceptButtonDefaultDisabled', false);
        }
    },

    onAccept: function () {
        var viewModel = this.getViewModel();
        var selectedMsp = this.selectedMsp();
        Ext.Ajax.request(
            {
                scope: this,
                url: Ext.String.format('api/serviceProblem/{0}/associate/msp/{1}', viewModel.serviceProblemId(), selectedMsp.id),
                method: 'POST',
                success: function () {
                    this.fireEvent('serviceProblemAssociatedToMsp', viewModel.serviceProblemId());
                    this.closeView();
                }
            }
        );
    },

    selectedMsp: function () {
        return this.lookupReference('mspGrid').getSelectionModel().getSelection()[0];
    }

});

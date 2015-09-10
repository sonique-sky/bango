Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.transferServiceProblemDialog',

    onShow: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        this.getViewModel().getStore('queues').load({
            id: serviceProblemId
        });

        var form = this.lookupReference('transferServiceProblemForm');
        form.isValid();
    },

    onAccept: function () {
        if (this.lookupReference('transferServiceProblemForm').isValid()) {
            var viewModel = this.getViewModel();
            var me = this.getView();
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/transfer', viewModel.serviceProblemId()),
                    method: 'POST',
                    jsonData: {
                        transferType: viewModel.transferType(),
                        queueId: viewModel.queueId()
                    },
                    scope: this,
                    success: function () {
                        this.fireEvent('serviceProblemTransferred', viewModel.serviceProblemId());
                        me.close();
                    }
                }
            );
        }
    },

    selectFirstRow: function (store) {
        var first = store.first();
        if (first) {
            this.lookupReference('queuesGrid').setSelection(first);
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    },

    onSelectQueue: function (view, td, cellIndex, record) {
        this.getViewModel().set('queueId', record.getData().id);
    }
});

Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.transferServiceProblemDialog',

    onShow: function () {
        var currentQueueId = this.getViewModel().currentQueueId();
        var queueStore = this.getViewModel().getStore('queues');

        queueStore.filterBy(function (queue) {
            return queue.manualTransferAllowed()
                && queue.queueId() !== currentQueueId;
        });

        queueStore.load();
    },

    onAccept: function () {
        if (this.lookupReference('transferServiceProblemForm').isValid()) {
            var me = this;
            var viewModel = me.getViewModel();
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/transfer', viewModel.serviceProblemId()),
                    method: 'POST',
                    jsonData: {
                        transferType: viewModel.transferType(),
                        queueId: me.selectedQueue().queueId()
                    },
                    scope: me,
                    success: function () {
                        me.fireEvent('serviceProblemTransferred', viewModel.serviceProblemId());
                        me.closeView();
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
        this.getViewModel().set('acceptButtonDefaultDisabled', !isValid);
    },

    selectedQueue: function () {
        return this.lookupReference('queuesGrid').getSelectionModel().getSelection()[0];
    }
});

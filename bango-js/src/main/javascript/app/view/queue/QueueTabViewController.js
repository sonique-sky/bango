Ext.define('Spm.view.queue.QueueTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueTab',

    listen: {
        controller: {
            'bulkClearDialog': {
                bulkOperationCompleted: 'onBulkOperationCompleted'
            }
        },
        component: {
            'queueTab': {
                activate: 'onQueueTabActivated',
                close: 'onQueueTabClosed',
                added: 'onQueueTabAdded'
            }
        }
    },

    onBulkOperationCompleted: function(rawJsonResponse) {
        this.getStore('queuedServiceProblems').loadRawData(rawJsonResponse);
    },

    onQueueTabAdded: function () {
        this.getViewModel().getStore('queuedServiceProblems').load();
    },

    onBeforeLoad: function (store, operation) {
        operation.setParams({queueId: this.queueId()});
    },

    onQueueTabActivated: function () {
        this.fireEvent('queueTabSelected', this.queueId());
    },

    onQueueTabClosed: function () {
        this.fireEvent('queueTabClosed', this.queueId());
    },

    onSelectAll: function () {
        this.gridSelectionModel().selectAll(true);
    },
    onDeselectAll: function () {
        this.gridSelectionModel().deselectAll(true);
    },


    onBulkTransfer: function () {
        if (this.ensureServiceProblemsSelected()) {
            var dialog = this.getView().add({
                xtype: 'bulkTransferDialog'
            });

            dialog.show();
        }
        else {
            this.showNoServiceProblemsSelectedMessage()
        }
    },

    onBulkClear: function () {
        if (this.ensureServiceProblemsSelected()) {
            var selectedServiceProblems = this.selectedServiceProblems();
            var hasActiveTroubleReports = this.hasActiveTroubleReports(selectedServiceProblems);
            var theMessage;

            if (hasActiveTroubleReports) {
                theMessage = 'One or more of the selected Service Problems has an active Trouble Report.<br/><br/>Are you sure you wish to continue?';
            } else {
                theMessage = 'Are you sure you wish to clear these Service Problems?';
            }

            var dialog = this.getView().add({
                xtype: 'bulkClearDialog',
                viewModel: {
                    data: {
                        message: theMessage,
                        acceptButtonDefaultDisabled: false,
                        serviceProblems: selectedServiceProblems
                    }
                }
            });
            dialog.show();
        }
        else {
            this.showNoServiceProblemsSelectedMessage();
        }
    },

    showNoServiceProblemsSelectedMessage: function () {
        Ext.Msg.show({
            title: 'Error',
            message: 'Please select at least one Service Problem!',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });
    },

    queueId: function () {
        return this.getViewModel().get('queue').get('id');
    },

    gridSelectionModel: function () {
        return this.lookupReference('queueTabGrid').getSelectionModel();
    },

    selectedServiceProblems: function () {
        return this.gridSelectionModel().getSelection();
    },

    ensureServiceProblemsSelected: function () {
        return this.selectedServiceProblems().length > 0;
    },

    hasActiveTroubleReports: function (selectedServiceProblems) {
        var serviceProblemsWithTroubleReports = Ext.Array.each(selectedServiceProblems, function (serviceProblem) {
            return serviceProblem.get('hasActiveTroubleReport');
        });

        return serviceProblemsWithTroubleReports.length > 0;
    }
});
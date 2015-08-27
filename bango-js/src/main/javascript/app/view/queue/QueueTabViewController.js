Ext.define('Spm.view.queue.QueueTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueTab',

    listen: {
        controller: {
            'bulkClearDialog': {
                bulkOperationCompleted: 'onBulkOperationCompleted'
            },
            'bulkTransferDialog': {
                bulkOperationCompleted: 'onBulkOperationCompleted'
            },
            'serviceProblemTab': {
                serviceProblemPulled: 'onServiceProblemPulled',
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled'
            },
            'workReminderDialog':{
                workReminderCreated: 'onWorkReminderCreated'
            }
        }
        //component: {
        //    'queueTab': {
        //        activate: 'onQueueTabActivated',
        //        deactivate: 'onQueueTabDeactivated',
        //        close: 'onQueueTabClosed',
        //        added: 'onQueueTabAdded'
        //    }
        //}
    },

    onCellClicked: function (view, td, cellIndex, record) {
        if (cellIndex > 0) {
            this.fireEvent('serviceProblemSelected', record.serviceProblemId());
        }
    },

    onSelectionChanged: function (selectionModel, selections) {
        var hasSelected = selections.length > 0;
        var viewModel = this.getViewModel();

        viewModel.set('bulkTransferDisabled', !hasSelected);
        viewModel.set('bulkClearDisabled', !hasSelected);
    },

    onBulkOperationCompleted: function (rawJsonResponse) {
        this.getStore('queuedServiceProblems').loadRawData(rawJsonResponse);
    },

    onServiceProblemPulled: function () {
        this.loadQueuedServiceProblems()
    },

    onWorkReminderCreated: function () {
        this.loadQueuedServiceProblems()
    },

    onServiceProblemHoldToggled: function () {
        this.loadQueuedServiceProblems()
    },

    onQueueTabAdded: function () {
        this.loadQueuedServiceProblems()
    },

    onBeforeLoad: function (store, operation) {
        operation.setParams({queueId: this.queueId()});
    },

    onQueueTabActivated: function () {
        this.fireEvent('queueTabSelected', this.queueId());
    },

    onQueueTabDeactivated: function () {
        this.fireEvent('queueTabDeselected', this.queueId());
    },

    onQueueTabClosed: function () {
        this.fireEvent('queueTabClosed', this.queueId());
    },

    onSelectAll: function () {
        this.gridSelectionModel().selectAll(false);
    },

    onDeselectAll: function () {
        this.gridSelectionModel().deselectAll(false);
    },

    onBulkTransfer: function () {
        var selectedServiceProblems = this.selectedServiceProblems();

        var dialog = this.getView().add({
            xtype: 'bulkTransferDialog',
            viewModel: {
                data: {
                    serviceProblems: selectedServiceProblems
                }
            }
        });

        dialog.show();
    },

    onBulkClear: function () {
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
    },

    queueId: function () {
        return this.getViewModel().queueId();
    },

    gridSelectionModel: function () {
        return this.lookupReference('queueTabGrid').getSelectionModel();
    },

    selectedServiceProblems: function () {
        return this.gridSelectionModel().getSelection();
    },

    hasActiveTroubleReports: function (selectedServiceProblems) {
        var serviceProblemsWithTroubleReports = Ext.Array.each(selectedServiceProblems, function (serviceProblem) {
            return serviceProblem.get('hasActiveTroubleReport');
        });

        return serviceProblemsWithTroubleReports.length > 0;
    },

    loadQueuedServiceProblems: function(){
        this.getViewModel().getStore('queuedServiceProblems').load();
    }
});
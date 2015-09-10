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
                serviceProblemPulled: 'loadQueuedServiceProblems',
                serviceProblemHoldToggled: 'loadQueuedServiceProblems'
            },
            'workReminderDialog': {
                workReminderCreated: 'loadQueuedServiceProblems'
            },
            'transferServiceProblemDialog': {
                serviceProblemTransferred: 'loadQueuedServiceProblems'
            }
        }
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
        var dialog = this.getView().add({
            xtype: 'bulkTransferDialog',
            viewModel: {
                data: {
                    serviceProblemIds: this.selectedServiceProblemIds()
                }
            }
        });

        dialog.show();
    },

    onBulkClear: function () {
        var me = this;
        var selectedServiceProblems = this.selectedServiceProblems();
        var hasActiveTroubleReports = this.hasActiveTroubleReports(selectedServiceProblems);

        var theMessage = (hasActiveTroubleReports)
            ? 'One or more of the selected Service Problems has an active Trouble Report.<br/><br/>Are you sure you wish to continue?'
            : 'Are you sure you wish to clear these Service Problems?';

        Ext.Msg.show({
            title: 'Bulk Clear',
            msg: theMessage,
            iconCls: 'icon-bulk-clear',
            buttons: Ext.Msg.OKCANCEL,

            fn: function (btn) {
                if (btn === 'ok') {
                    Ext.Ajax.request({
                        url: 'api/queue/bulkClear',
                        jsonData: {
                            originalQueueId: me.queueId(),
                            serviceProblemIds: me.selectedServiceProblemIds()
                        },
                        success: me.onBulkOperationCompleted,
                        scope: me
                    });
                }
            }
        });
    },

    queueId: function () {
        return this.getViewModel().queueId();
    },

    gridSelectionModel: function () {
        return this.getView().getSelectionModel();
    },

    selectedServiceProblems: function () {
        return this.gridSelectionModel().getSelection();
    },

    selectedServiceProblemIds: function () {
        return Ext.Array.map(this.selectedServiceProblems(),
            function (serviceProblem) {
                return serviceProblem.serviceProblemId();
            }
        );
    },

    hasActiveTroubleReports: function (selectedServiceProblems) {
        return Ext.Array.some(selectedServiceProblems,
            function (serviceProblem) {
                return serviceProblem.get('hasActiveTroubleReport');
            }
        );
    },

    loadQueuedServiceProblems: function () {
        this.getStore('queuedServiceProblems').load();
    }
});

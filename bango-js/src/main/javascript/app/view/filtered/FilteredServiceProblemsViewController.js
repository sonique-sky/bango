Ext.define('Spm.view.filtered.FilteredServiceProblemsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.filteredServiceProblems',

    requires: [
        'Spm.view.filtered.transfer.BulkTransferDialog'
    ],

    listen: {
        controller: {
            'bulkClearDialog': {
                bulkOperationCompleted: 'reloadFilteredServiceProblemStore'
            },
            'bulkTransferDialog': {
                bulkOperationCompleted: 'reloadFilteredServiceProblemStore'
            },
            'serviceProblemTab': {
                serviceProblemPulled: 'reloadFilteredServiceProblemStore',
                serviceProblemHoldToggled: 'reloadFilteredServiceProblemStore'
            },
            'workReminderDialog': {
                workReminderCreated: 'reloadFilteredServiceProblemStore'
            },
            'transferServiceProblemDialog': {
                serviceProblemTransferred: 'reloadFilteredServiceProblemStore'
            },
            'reassignServiceProblemDialog': {
                serviceProblemReassigned: 'reloadFilteredServiceProblemStore'
            },
            'associateServiceProblemToMspDialog': {
                serviceProblemAssociatedToMsp: 'reloadFilteredServiceProblemStore'
            },
            'clearServiceProblemDialog': {
                serviceProblemCleared: 'reloadFilteredServiceProblemStore'
            }
        }
    },

    initViewModel: function (viewModel) {
        var me = this,
            myView = me.getView(),
            myStore = myView.getStore(),
            params = myView.itemId.split('-');

        viewModel.setStores({filteredServiceProblems: myStore});

        if (params[0] == 'queueId') {
            myView.setTitle(viewModel.get('queue').queueName());
            myView.setIconCls('icon-queue');
            me.mon(myView, 'activate', me.onQueueTabActivated, me);
            me.mon(myView, 'deactivate', me.onQueueTabDeactivated, me);
            me.mon(myView, 'close', me.onQueueTabClosed, me);
            me.mon(myView, 'removed', me.onQueueTabClosed, me);
        } else {
            myView.setTitle('Search Results');
            myView.setIconCls('icon-search')
        }
        if (!myStore.isLoaded()) {
            myStore.load();
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

    reloadFilteredServiceProblemStore: function () {
        this.getStore('filteredServiceProblems').reload();
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
                        success: me.reloadFilteredServiceProblemStore,
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
                return serviceProblem.hasActiveTroubleReport();
            }
        );
    },

    workItemReminderRenderer: function (value, metadata, record) {
        var workItem = record.getWorkItem();
        return workItem ? Ext.Date.format(workItem.get('reminder'), 'd/m/Y H:i') : "";
    },

    workItemCreatedDateRenderer: function (value, metadata, record) {
        var workItem = record.getWorkItem();
        return workItem ? Ext.Date.format(workItem.get('createdDate'), 'd/m/Y H:i') : "";
    }

});

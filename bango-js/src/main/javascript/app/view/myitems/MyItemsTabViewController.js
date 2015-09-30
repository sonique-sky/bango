Ext.define('Spm.view.myitems.MyItemsTabViewController', {
    extend: 'Spm.view.common.BaseServiceProblemViewController',
    alias: 'controller.myItems',

    listen: {
        controller: {
            'serviceProblemTab': {
                serviceProblemPulled: 'loadMyItems',
                serviceProblemHoldToggled: 'loadMyItems'
            },
            'myItems': {
                serviceProblemHoldToggled: 'loadMyItems'
            },
            'workReminderDialog': {
                workReminderCreated: 'loadMyItems'
            },
            'transferServiceProblemDialog': {
                serviceProblemTransferred: 'loadMyItems'
            },
            'reassignServiceProblemDialog': {
                serviceProblemReassigned: 'loadMyItems'
            },
            'associateServiceProblemToMspDialog': {
                serviceProblemAssociatedToMsp: 'loadMyItems'
            },
            'clearServiceProblemDialog': {
                serviceProblemCleared: 'loadMyItems'
            },
            'troubleReportDialog': {
                troubleReportCreated: 'loadMyItems'
            }
        }
    },

    initViewModel: function (viewModel) {
        var agent = viewModel.get('authenticatedAgent');
        viewModel.getStore('myItems').filter('agent', agent.agentCode());
    },

    onToggleHoldWidgetAttach: function (column, widget, serviceProblem) {
        if (serviceProblem.getWorkItem().isHeld()) {
            widget.setIconCls('icon-release');
            widget.setTooltip('Unhold this Work Item');
        } else {
            widget.setIconCls('icon-hold');
            widget.setTooltip('Hold this Work Item');
        }
    },

    onToggleHoldServiceProblem: function (btn) {
        this.doToggleHoldServiceProblem(btn.getWidgetRecord(), Ext.emptyFn);
    },

    onSetWorkReminder: function (btn) {
        this.doSetWorkReminder(btn.getWidgetRecord(), Ext.emptyFn);
    },

    onCellClicked: function (view, td, cellIndex, record) {
        if (cellIndex > 1) {
            this.fireEvent('serviceProblemSelected', record.serviceProblemId());
        }
    },

    loadMyItems: function () {
        this.getView().getStore().load()
    },

    formattedWorkItemCreatedDate: function (val, meta, record) {
        return Ext.util.Format.date(record.getWorkItem().get('createdDate'), 'd/m/y H:i');
    },

    refreshMyItems: function () {
        this.fireEvent('refreshed');
    },

    queueNameRenderer: function(queue) {
        return queue.queueName();
    },

    agentNameRenderer: function (value, metaData, record) {
        return record.getWorkItem().getAgent().getName();
    },

    workItemActionRenderer: function (value, meta, record ){
        return record.getWorkItem().get('action').description;
    },

    workItemTypeRenderer: function(value, meta, record) {
        return record.getWorkItem().get('type');
    },

    workItemStatusRenderer: function(value, meta, record) {
        return record.getWorkItem().get('status');
    }

});

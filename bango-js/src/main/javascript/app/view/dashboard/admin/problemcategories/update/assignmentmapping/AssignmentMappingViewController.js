Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    initViewModel: function (viewModel) {
        viewModel.set('assignmentCodeFilter', this.getView().getTitle());
    },

    queueNameRenderer: function (val, row, record) {
        return record.get('queueName');
    },

    serviceTypeNameRenderer: function (val, row, record) {
        return record.get('serviceTypeDisplayName');
    },

    /** don't copy paste this! */
    filterServiceTypes: function (currentServiceType) {
        var viewModel = this.getViewModel(),
            currentAssignmentCode = this.getView().getTitle(),
            serviceTypeStore = viewModel.get('serviceTypes'),
            allQueueRoutingForSelectedAssignmentCode,
            serviceTypesToFilter;

        allQueueRoutingForSelectedAssignmentCode = Ext.Array.filter(viewModel.get('problemCategory').get('queueRouting'), function (queueRouteMapping) {
            return queueRouteMapping.assignmentCode === currentAssignmentCode;
        });
        serviceTypesToFilter = Ext.Array.remove(Ext.Array.pluck(allQueueRoutingForSelectedAssignmentCode, 'serviceType'), currentServiceType);

        serviceTypeStore.filterBy(function (item) {
            return !Ext.Array.contains(serviceTypesToFilter, item.get('name'));
        });

    },

    onBeforeEdit: function (editor, ctx) {
        this.filterServiceTypes(ctx.record.get('serviceType'));
        return ctx.colIdx == 0 || ctx.colIdx == 1;
    },

    updateRouting: function (editor, ctx) {
        ctx.record.set('serviceType', ctx.newValues.serviceTypeDisplayName);
        ctx.record.set('serviceTypeDisplayName', this.getViewModel().get('serviceTypes').getById(ctx.newValues.serviceTypeDisplayName).displayName());
        ctx.record.set('queueId', ctx.newValues.queueId);
        ctx.record.set('queueName', this.getViewModel().get('queues').getById(ctx.newValues.queueId).queueName());
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', true);
    },

    cancelRouting: function (editor, ctx) {
        if (ctx.originalValues.serviceTypeDisplayName === null && ctx.originalValues.queueId === null) {
            this.removeRecord(ctx.record);
        }
    },

    startEditing: function (grid, rowIndex, colIndex, item, event, record, row) {
        grid.up().getPlugin('queueRoutingRowEditingPlugin').startEdit(record);
    },

    removeRecord: function (record) {
        var queueRouting = this.getViewModel().get('problemCategory').get('queueRouting');
        Ext.Array.remove(queueRouting,
            Ext.Array.findBy(queueRouting, function (item) {
                return item.id === record.getId()
            })
        );
        this.getViewModel().get('assignmentMappings').load();
    },

    deleteQueueRouting: function (grid, rowIndex, colIndex, item, event, record, row) {
        this.removeRecord(record);
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', true);
        event.stopEvent();
    },

    addQueueRouting: function () {
        var me = this,
            queueRouting = me.getViewModel().get('problemCategory').get('queueRouting');

        Ext.Array.push(queueRouting, {
            assignmentCode: this.getView().getTitle(),
            queueId: null,
            queueName: null,
            serviceType: null,
            serviceTypeDisplayName: null
        });

        var assignmentMappingsStore = me.getViewModel().get('assignmentMappings');
        assignmentMappingsStore.load({
            callback: function () {
                me.getView().getPlugin('queueRoutingRowEditingPlugin').startEdit(assignmentMappingsStore.last());
            }
        });
    }

});

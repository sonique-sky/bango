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

    onBeforeEdit: function (editor, ctx) {
        return ctx.colIdx == 0 || ctx.colIdx == 1;
    },

    updateRouting: function (editor, ctx) {
        ctx.record.set('serviceType', ctx.newValues.serviceType);
        ctx.record.set('serviceTypeDisplayName', this.getViewModel().get('serviceTypes').getById(ctx.newValues.serviceType).displayName());
        ctx.record.set('queueId', ctx.newValues.queueId);
        ctx.record.set('queueName', this.getViewModel().get('queues').getById(ctx.newValues.queueId).queueName());
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', true);
    },

    deleteRouting: function (grid, rowIndex, colIndex, item, event, record, row) {
        var queueRouting = this.getViewModel().get('problemCategory').get('queueRouting');
        Ext.Array.remove(queueRouting,
            Ext.Array.findBy(queueRouting, function (item) {
                return item.id === record.getId()
            })
        );
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', true);
        this.getViewModel().get('assignmentMappings').load();
        event.stopEvent();
    },

    onNewButtonClick: function () {
    }
});

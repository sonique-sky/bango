Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    initViewModel: function (viewModel) {
        viewModel.set('assignmentCodeFilter', this.getView().getTitle());
    },

    queueNameRenderer: function (val, row, record) {
        return record.get('queueName');
    },

    onBeforeEdit: function (editor, ctx) {
        return ctx.colIdx == 1;
    },

    updateRouting: function (editor, ctx) {
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
    }
});

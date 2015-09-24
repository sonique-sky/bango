Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    initViewModel: function (viewModel) {
        viewModel.set('assignmentCodeFilter', this.getView().getTitle());
    },

    queueNameRenderer: function (val, row, record) {
        return record.get('queueName');
    },

    onRowEditorEdit: function (editor, ctx) {
        ctx.record.set('queueId', ctx.newValues.queueId);
        ctx.record.set('queueName', this.getViewModel().get('queues').getById(ctx.newValues.queueId).queueName());
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', true);
    }

});

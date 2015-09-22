Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    initViewModel: function (viewModel) {
        var title = this.getView().getTitle();
        var routing = viewModel.get('problemCategory').get('queueRouting')[title];

        if (routing) {
            viewModel.getStore('assignmentMappings').loadData(routing);
        }
    },

    queueComboAttach: function (col, combo, rec) {
        debugger;
        combo.setValue(rec.get('queue').queueId);
    }

});

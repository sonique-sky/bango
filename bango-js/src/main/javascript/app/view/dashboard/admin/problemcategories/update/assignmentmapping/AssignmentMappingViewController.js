Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    initViewModel: function (viewModel) {
        var title = this.getView().getTitle();
        var queueRouting = viewModel.get('problemCategory').get('queueRouting')[title];

        if (queueRouting) {
            viewModel.getStore('assignmentMappings').loadData(queueRouting);
        }
    },

    queueComboAttach: function (col, combo, rec) {
        combo.setValue(rec.get('queue').queueId);
    }

});

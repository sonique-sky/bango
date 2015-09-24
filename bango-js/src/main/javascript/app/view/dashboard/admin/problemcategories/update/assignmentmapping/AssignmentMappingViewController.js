Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    requires: [
        'Ext.data.ChainedStore'
    ],

    initViewModel: function (viewModel) {
        var title = this.getView().getTitle();
        var queueRouting = viewModel.get('problemCategory').get('queueRouting')[title];

        if (queueRouting) {
            viewModel.getStore('assignmentMappings').loadData(queueRouting);
        }
    },

    queueComboAttach: function (col, combo, rec) {
        var store = this.getViewModel().get('queues');
        combo.setStore(Ext.create('Ext.data.ChainedStore', {source: store}));
        if (!store.isLoaded()) {
            store.load();
        }
        combo.setValue(rec.get('queue').queueId);
    }

});

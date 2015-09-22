Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assignmentMapping',

    initViewModel: function (viewModel) {
        var title = this.getView().getTitle();
        var problemCategory = viewModel.get('problemCategory');
        console.log(problemCategory);

        var foo = problemCategory.get('queueRouting')[title];

        if (foo) {
            console.log(foo);
            var store = viewModel.getStore('assignmentMappings');
            store.loadData(foo);
            console.log(store);
        }
    }

});

Ext.define('Spm.view.search.SearchResultTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchResultTab',

    //onServiceProblemTabClosed: function () {
    //    this.fireEvent('serviceProblemTabClosed', this.getViewModel().get('serviceProblemId'));
    //},

    //onRefreshServiceProblem: function () {
    //    this.loadServiceProblem();
    //},

    onTabAdded: function () {
        var viewModel = this.getViewModel();

        var serviceProblemsStore = viewModel.get('serviceProblems');
        serviceProblemsStore.mon(serviceProblemsStore, 'beforeload', this.onBeforeLoad, this);
    },

    onBeforeLoad: function (store, operation) {
        var viewModel = this.getViewModel();

        operation.setParams(viewModel.get('params'));
    }

})
;
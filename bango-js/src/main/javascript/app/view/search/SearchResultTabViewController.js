Ext.define('Spm.view.search.SearchResultTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchResultTab',

    onTabAdded: function () {
        var viewModel = this.getViewModel();

        var serviceProblemsStore = viewModel.getStore('serviceProblems');
        this.mon(serviceProblemsStore, 'beforeload', this.onBeforeLoad, this);
    },

    onCellClicked: function (view, td, cellIndex, record) {
        if (cellIndex > 0) {
            this.fireEvent('serviceProblemSelected', record.serviceProblemId());
        }
    },

    onTabClosed: function () {
        this.fireEvent('searchResultTabClosed', this.params());
    },

    onBeforeLoad: function (store, operation) {
        operation.setParams(this.params());
    },

    params: function () {
        return this.getViewModel().get('params');
    }
});

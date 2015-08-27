Ext.define('Spm.view.search.SearchResultTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchResult',

    onTabAdded: function () {
        var serviceProblemsStore = this.getViewModel().getStore('serviceProblems');
        this.mon(serviceProblemsStore, 'beforeload', this.onBeforeLoad, this);
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent('serviceProblemSelected', record.serviceProblemId());
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

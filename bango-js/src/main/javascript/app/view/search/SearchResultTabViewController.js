Ext.define('Spm.view.search.SearchResultTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.searchResult',

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent('serviceProblemSelected', record.serviceProblemId());
    },

    onTabClosed: function () {
        this.fireEvent('searchResultTabClosed', this.getViewModel().get('params'));
    }
});

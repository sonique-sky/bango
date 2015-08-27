Ext.define('Spm.view.navigation.search.SearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.search',

    data: {
        radioValue: {
            searchTerm: 'serviceProblemId'
        },
        searchParameter: null
    },

    formulas: {
        searchButtonDisabled: {
            get: function (get) {
                return !get('radioValue.searchTerm') || !get('searchParameter');
            }
        }
    },

    searchParams: function () {
        return {searchTerm: this.get('radioValue.searchTerm'), searchParameter: this.get('searchParameter')};
    }
});
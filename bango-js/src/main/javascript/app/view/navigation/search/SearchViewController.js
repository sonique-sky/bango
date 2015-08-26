Ext.define('Spm.view.navigation.search.SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search',

    requires: ['Spm.store.ServiceProblemSearchResults'],

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearch();
        }
    },

    onSearch: function () {
        var me = this,
            viewModel = this.getViewModel(),
            searchParameter = viewModel.get('searchParameter');


        var store = Ext.create('Spm.store.ServiceProblemSearchResults');
        var params = {
            searchTerm: viewModel.get('radioValue.searchTerm'),
            searchParameter: searchParameter
        };
        store.load({
            params: params,
            callback: function (records, operation, success) {
                if (records.length == 0) {
                    Ext.Msg.show({
                        title: 'No Results',
                        msg: 'The search did not return any records.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                } else if (records.length == 1) {
                    me.fireEvent('displayServiceProblem', records[0]);
                } else {
                    me.fireEvent('displaySearchResults', store, params);
                }
            }
        });
    }
});
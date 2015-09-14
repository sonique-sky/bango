Ext.define('Spm.view.navigation.search.SearchViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.search',

    requires: [
        'Spm.store.ServiceProblems'
    ],

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearch();
        }
    },

    onSearch: function () {
        var me = this;
        var store = Ext.create('Spm.store.ServiceProblems');
        var filters = me.getViewModel().filter();
        store.filter(filters);
        store.load({
            callback: function (records) {
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
                    me.fireEvent('displaySearchResults', store, filters);
                }
            }
        });
    }
});
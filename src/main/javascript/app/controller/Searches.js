Ext.define('Spm.controller.Searches', {
    extend: 'Ext.app.Controller',
    alias: 'controller.searches',

    constructor: function (config) {
        this.activeSearchResultTabs = Ext.create('Ext.util.MixedCollection');

        this.proxy = Ext.create('proxy.ajax', {
            url: 'api/search/simple',
            model: 'Spm.model.ServiceProblem',
            reader: 'json'
        });


        this.callParent([config]);
    },

    init: function () {
        this.listen({
            component: {
                'searchPanel': {
                    searchStarted: this.onSearchStarted,
                    searchFinished: this.onSearchFinished
                }
            }
        });
    },

    onSearchStarted: function (searchCriteria) {
        var me = this;

        if (this.isUniqueSearch(searchCriteria)) {
            var operation = Ext.create('Ext.data.Operation', {
                action: 'read',
                params: searchCriteria
            });

            me.proxy.read(operation, this.onSearchFinished, me);
        } else {
//            var searchResultTab = this.activeSearchResultTabs.getByKey(searchCriteria);
//            if(searchResultTab) {
//                searchResultTab.reload();
//            } else {
//                Spm.store.ServiceProblems.searchServiceProblemStore().load(searchCriteria);
//            }
        }


    },

    onSearchFinished: function (operation) {
        if (operation.wasSuccessful()) {
            var records = operation.getRecords();
            if (records.length == 0) {
                Ext.Msg.show({
                    title: 'No Results',
                    msg: 'The search did not return any records.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            } else if (records.length == 1) {
                this.fireEvent('displayServiceProblem', records[0]);
            }
        }
    },

    isUniqueSearch: function (searchCriteria) {
        return searchCriteria.searchType == 'serviceProblemId';
    }


});
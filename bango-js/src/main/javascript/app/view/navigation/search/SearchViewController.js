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
        //
        //store.nextPage({
        //    params: {
        //        searchTerm: viewModel.get('radioValue.searchTerm'),
        //        searchParameter: searchParameter
        //    },
        //    callback: function(records) {
        //        console.log(records.length);
        //    }
        //});
        //store.nextPage({
        //    params: {
        //        searchTerm: viewModel.get('radioValue.searchTerm'),
        //        searchParameter: searchParameter
        //    },
        //    callback: function(records) {
        //        console.log(records.length);
        //    }
        //});

        //callback: function(records, operation, success) {
        //    debugger;
        //    if (records.length == 0) {
        //        Ext.Msg.show({
        //            title: 'No Results',
        //            msg: 'The search did not return any records.',
        //            buttons: Ext.Msg.OK,
        //            icon: Ext.Msg.INFO
        //        });
        //    } else if (records.totalRecordCount == 1) {
        //        var serviceProblem = records.onePageOfSearchResults[0];
        //
        //        me.fireEvent('displayServiceProblem', serviceProblem);
        //    } else {
        //        debugger;
        //        var tabPanel = me.getTabPanel();
        //        var searchResultTab = me.activeSearchResultTabs.getByKey(me.searchCriteriaKey(searchParameter));
        //        if (!searchResultTab) {
        //            searchResultTab = me.createSearchResultTabFor(searchParameter);
        //            me.activeSearchResultTabs.add(this.searchCriteriaKey(searchParameter), searchResultTab);
        //            tabPanel.add(searchResultTab);
        //        }
        //        searchResultTab.loadWith(records);
        //        tabPanel.setActiveTab(searchResultTab);
        //    }
        //}

        //Ext.Ajax.request({
        //    url: Ext.String.format('api/search/{0}/{1}', viewModel.get('radioValue.searchTerm'), searchParameter),
        //    method: 'GET',
        //
        //    success: function (response, opts) {
        //        var records = Ext.decode(response.responseText);
        //
        //        if (records.totalRecordCount == 0) {
        //            Ext.Msg.show({
        //                title: 'No Results',
        //                msg: 'The search did not return any records.',
        //                buttons: Ext.Msg.OK,
        //                icon: Ext.Msg.INFO
        //            });
        //        } else if (records.totalRecordCount == 1) {
        //            var serviceProblem = records.onePageOfSearchResults[0];
        //
        //            me.fireEvent('displayServiceProblem', serviceProblem);
        //        } else {
        //            debugger;
        //            var tabPanel = me.getTabPanel();
        //            var searchResultTab = me.activeSearchResultTabs.getByKey(me.searchCriteriaKey(searchParameter));
        //            if (!searchResultTab) {
        //                searchResultTab = me.createSearchResultTabFor(searchParameter);
        //                me.activeSearchResultTabs.add(this.searchCriteriaKey(searchParameter), searchResultTab);
        //                tabPanel.add(searchResultTab);
        //            }
        //            searchResultTab.loadWith(records);
        //            tabPanel.setActiveTab(searchResultTab);
        //        }
        //    }
        //});
    },

    // Need this because MixedCollection doesn't seem to work with Objects as keys...
    searchCriteriaKey: function (searchCriteria) {
        return Ext.String.format('{0}:{1}', searchCriteria.searchType, searchCriteria.searchParameter);
    },

});
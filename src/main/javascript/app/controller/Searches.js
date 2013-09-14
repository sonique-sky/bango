Ext.define('Spm.controller.Searches', {
    extend: 'Ext.app.Controller',
    alias: 'controller.searches',

    requires: [
        'Spm.proxy.ServiceProblemApiProxy',
        'Spm.proxy.ApiOperation'
    ],
    views: [
        'search.SearchResultTabContent'
    ],
    mixins: {
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler'
    },

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    constructor: function (config) {
        this.activeSearchResultTabs = Ext.create('Ext.util.MixedCollection');
        this.mixins.serviceProblemClickHandler.constructor.call(this, config);

        this.callParent([config]);
    },

    init: function () {
        this.listen({
            component: {
                'searchPanel': {
                    searchStarted: this.onSearchStarted
                },
                'searchResultTabContent': {
                    destroy: this.onSearchResultTabDestroyed,
                    serviceProblemClicked: this.onServiceProblemClicked
                }
            }
        });
    },

    onSearchResultTabDestroyed: function (searchResultTab) {
        this.activeSearchResultTabs.removeAtKey(searchResultTab.getSearchCriteria());
    },

    doSearch: function (searchCriteria) {
        var operation = Spm.proxy.ApiOperation.search({params: searchCriteria});

        Spm.proxy.ServiceProblemApiProxy.read(operation, this.onSearchFinished, this);
    },

    onSearchStarted: function (searchCriteria) {
        if (this.isUniqueSearch(searchCriteria)) {
            this.doSearch(searchCriteria);
        } else {
            var searchResultTab = this.activeSearchResultTabs.getByKey(this.searchCriteriaKey(searchCriteria));
            if (searchResultTab) {
                searchResultTab.reloadAndMakeActive();
            } else {
                this.doSearch(searchCriteria);
            }
        }
    },

    // Need this because MixedCollection doesn't seem to work with Objects as keys...
    searchCriteriaKey: function(searchCriteria) {
        return Ext.String.format('{0}:{1}', searchCriteria.searchType, searchCriteria.searchParameter);
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
            } else {
                var tabPanel = this.getTabPanel();
                var searchCriteria = operation.params;
                var searchResultTab = this.activeSearchResultTabs.getByKey(searchCriteria);
                if (!searchResultTab) {
                    searchResultTab = this.createSearchResultTabFor(searchCriteria);
                    this.activeSearchResultTabs.add(this.searchCriteriaKey(searchCriteria), searchResultTab);
                    tabPanel.add(searchResultTab);
                    searchResultTab.loadWith(records);
                }

                tabPanel.setActiveTab(searchResultTab);
            }
        }
    },

    createSearchResultTabFor: function (searchCriteria) {
        return Ext.widget('searchResultTabContent', {searchCriteria: searchCriteria});
    },

    isUniqueSearch: function (searchCriteria) {
        return searchCriteria.searchType == 'serviceProblemId';
    }
});
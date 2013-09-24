Ext.define('Spm.controller.Searches', {
    extend: 'Ext.app.Controller',
    alias: 'controller.searches',

    requires: [
        'Spm.proxy.ServiceProblemApiProxy',
        'Spm.proxy.ApiOperation'
    ],

    mixins: {
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler',
        actionContextManager: 'Spm.controller.mixins.ActionContextManager'
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
            controller: {
                '#Security': {
                    loggedOut: this.onLoggedOut
                }
            },
            component: {
                'searchResultTabContent': {
                    destroy: this.onSearchResultTabDestroyed,
                    serviceProblemClicked: this.onServiceProblemClicked
                },
                'searchPanel': {
                    searchFinished: this.onSearchFinished
                }
            }
        });
    },

    onSearchResultTabDestroyed: function (searchResultTab) {
        this.activeSearchResultTabs.removeAtKey(searchResultTab.getSearchCriteria());
    },

    // Need this because MixedCollection doesn't seem to work with Objects as keys...
    searchCriteriaKey: function (searchCriteria) {
        return Ext.String.format('{0}:{1}', searchCriteria.searchType, searchCriteria.searchParameter);
    },

    onSearchFinished: function (records, searchCriteria) {
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
            var searchResultTab = this.activeSearchResultTabs.getByKey(this.searchCriteriaKey(searchCriteria));
            if (!searchResultTab) {
                searchResultTab = this.createSearchResultTabFor(searchCriteria);
                this.activeSearchResultTabs.add(this.searchCriteriaKey(searchCriteria), searchResultTab);
                tabPanel.add(searchResultTab);
            }
            searchResultTab.loadWith(records);

            tabPanel.setActiveTab(searchResultTab);
        }
    },

    createSearchResultTabFor: function (searchCriteria) {
        return Ext.widget('searchResultTabContent', {searchCriteria: searchCriteria});
    },

    onLoggedOut: function () {
        var tabPanel = this.getTabPanel();
        this.activeSearchResultTabs.each(function (item) {
            tabPanel.remove(item);
        });
    }
});
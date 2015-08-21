Ext.define('Spm.view.application.container.AppContainerViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.appContainer',

        data: {
            activeQueueTabs: Ext.create('Ext.util.MixedCollection'),
            activeServiceProblemTabs: Ext.create('Ext.util.MixedCollection'),
            activeSearchResultTabs: Ext.create('Ext.util.MixedCollection')
        },

        clearActiveTabs: function () {
            this.activeQueueTabs().removeAll();
            this.activeServiceProblemTabs().removeAll();
            this.activeSearchResultTabs().removeAll();
        },

        queueTabForId: function (queueId) {
            return this.activeQueueTabs().containsKey(queueId) ? this.activeQueueTabs().get(queueId) : null;
        },

        addQueueTab: function (queueId, queueTab) {
            this.activeQueueTabs().add(queueId, queueTab);
        },

        removeQueueTabForId: function (queueId) {
            this.activeQueueTabs().removeAtKey(queueId);
        },

        searchResultTabForId: function (searchResultId) {
            return this.activeSearchResultTabs().containsKey(searchResultId) ? this.activeSearchResultTabs().get(searchResultId) : null;
        },

        addSearchResultTab: function (searchResultId, searchResultTab) {
            this.activeSearchResultTabs().add(searchResultId, searchResultTab);
        },

        removeSearchResultTabForId: function (searchResultId) {
            this.activeSearchResultTabs().removeAtKey(searchResultId);
        },

        serviceProblemTabForId: function (serviceProblemId) {
            return this.activeServiceProblemTabs().containsKey(serviceProblemId) ? this.activeServiceProblemTabs().get(serviceProblemId) : null;
        },

        addServiceProblemTab: function (serviceProblemId, serviceProblemTab) {
            this.activeServiceProblemTabs().add(serviceProblemId, serviceProblemTab);
        },

        removeServiceProblemTabForId: function (serviceProblemId) {
            this.activeServiceProblemTabs().removeAtKey(serviceProblemId);
        },

        activeQueueTabs: function () {
            return this.get('activeQueueTabs');
        },

        activeServiceProblemTabs: function () {
            return this.get('activeServiceProblemTabs');
        },
        
        activeSearchResultTabs: function () {
            return this.get('activeSearchResultTabs');
        }
    }
);
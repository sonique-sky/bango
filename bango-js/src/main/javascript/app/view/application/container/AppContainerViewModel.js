Ext.define('Spm.view.application.container.AppContainerViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.appContainer',

        data: {
            activeQueueTabs: Ext.create('Ext.util.MixedCollection'),
            activeServiceProblemTabs: Ext.create('Ext.util.MixedCollection')
        },

        clearActiveTabs: function () {
            this.activeQueueTabs().removeAll();
            this.activeServiceProblemTabs().removeAll();
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

        activeQueueTabs: function () {
            return this.get('activeQueueTabs');
        },

        serviceProblemTabForId: function (serviceProblemId) {
            return this.activeServiceProblemTabs().containsKey(serviceProblemId) ? this.activeServiceProblemTabs().get(serviceProblemId) : null;
        },

        addServiceproblemTab: function (serviceProblemId, serviceProblemTab) {
            this.activeServiceProblemTabs().add(serviceProblemId, serviceProblemTab);
        },

        removeServiceProblemTabForId: function (serviceProblemId) {
            this.activeServiceProblemTabs().removeAtKey(serviceProblemId);
        },

        activeServiceProblemTabs: function () {
            return this.get('activeServiceProblemTabs');
        }
    }
);
Ext.define('Spm.view.container.AppContainerViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.appContainer',

        requires: [
            'Ext.util.MixedCollection'
        ],

        data: {
            activeServiceProblemTabs: Ext.create('Ext.util.MixedCollection')
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

        activeServiceProblemTabs: function () {
            return this.get('activeServiceProblemTabs');
        }
    }
);

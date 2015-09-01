Ext.define('Spm.view.SupermanViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.superman',

    stores: {
        authenticatedAgents: {
            type: 'authenticatedAgent',
            listeners: {
                load: 'onAuthenticatedAgentLoaded'
            }
        }
    },

    data: {
        authenticatedAgent: null
    }
});
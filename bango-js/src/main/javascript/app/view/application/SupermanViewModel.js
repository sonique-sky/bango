Ext.define('Spm.view.application.SupermanViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.superman',

        stores: {
            authenticatedAgent: {
                type: 'authenticatedAgent',
                listeners: {
                    load: 'onAuthenticatedAgentLoaded'
                }
            }
        },

        data: {
            authenticatedAgent: null
        }
    }
);
Ext.define('Spm.view.navigation.state.AgentStateViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.agentState',

        requires: [
            'Spm.store.AgentState'
        ],

        stores: {
            agentState: {
                type: 'agentState',
                listeners: {
                    load: 'onAgentStateLoaded'
                }
            }
        },

        data: {
            currentAgentState: null
        },

        formulas: {
            availabilityButtonText: {
                bind: {
                    bindTo: '{currentAgentState.availability}'
                },
                get: function(availability) {
                    if('Available' === availability) {
                        return 'Make Me Unavailable';
                    }

                    return 'Make Me Available'
                }
            },
            availabilityLabelText: {
                bind: {
                    bindTo: '{currentAgentState.availability}'
                },
                get: function(availability) {
                    if('Available' === availability) {
                        return 'Available';
                    }

                    return 'Unavailable'
                }
            }
        }
    }
);
Ext.define('Spm.view.navigation.state.AgentStateViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.agentState',

        requires: [
            'Spm.model.AgentState'
        ],

        stores: {
            agentState: {
                model: 'Spm.model.AgentState',

                proxy: {
                    type: 'ajax',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    },
                    url: 'api/agent/agentState'
                },

                listeners: {
                    load: 'onAgentStateLoaded',
                    refresh: 'onAgentStateLoaded'
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
                get: function (availability) {
                    if ('Available' === availability) {
                        return 'Make Me Unavailable';
                    }

                    return 'Make Me Available'
                }
            },
            availabilityLabelText: {
                bind: {
                    bindTo: '{currentAgentState.availability}'
                },
                get: function (availability) {
                    if ('Available' === availability) {
                        return 'Available';
                    }

                    return 'Unavailable'
                }
            },
            availabilityButtonDisabled: {
                bind: '{authenticatedAgent}',
                get: function (agent) {
                    return !agent || !agent.hasPrivilege('CanBecomeAvailable');
                }
            }
        }
    }
);
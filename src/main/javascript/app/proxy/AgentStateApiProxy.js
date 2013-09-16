Ext.define('Spm.proxy.AgentStateApiProxy', {
    extend: 'Spm.proxy.ApiProxy',

    singleton: true,

    model: 'Spm.model.AgentState',

    requires: [
        'Spm.model.AgentState'
    ]
});
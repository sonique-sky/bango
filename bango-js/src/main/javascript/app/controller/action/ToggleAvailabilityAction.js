Ext.define('Spm.controller.action.ToggleAvailabilityAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.ToggleAvailabilityAction',

    statics: {
        ACTION_NAME: 'toggle-availability'
    },

    requires: [
    ],

    constructor: function () {
        this.callParent([
            {
                name: Spm.action.ToggleAvailabilityAction.ACTION_NAME
            }
        ]);
    },

    startAction: function () {
        var store = Ext.data.StoreManager.lookup('AgentState');
        var operation = Spm.proxy.ApiOperation.agentToggleAvailability();

        Spm.proxy.AgentStateApiProxy.update(operation, function (operation) {
            if (operation.wasSuccessful()) {
                store.loadRecords(operation.getResultSet().records);
            }
        }, this);
    },

    updateState: function (agentStatusPanel, authenticatedAgent) {
        var hasPrivilege = authenticatedAgent.hasPrivilege('ToggleAvailability');

        this.setDisabled(!hasPrivilege)
    }
});
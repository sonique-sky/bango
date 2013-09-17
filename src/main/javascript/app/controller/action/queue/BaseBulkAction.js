Ext.define('Spm.controller.action.queue.BaseBulkAction', {
    extend: 'Spm.controller.action.BaseAction',

    performBulkOperation: function (actionUrl, params, queueTab) {
        Ext.Ajax.request(
            {
                url: 'api/queue/' + actionUrl,
                jsonData: params,
                success: function (response) {
                    queueTab.loadWith(response);
                }
            }
        );
    },

    selectedServiceProblemIds: function (queueTab) {
        return Ext.Array.map(
            queueTab.selectedServiceProblems(),
            function (serviceProblem) {
                return serviceProblem.serviceProblemId();
            }
        );
    },

    updateState: function (queueTab, authenticatedAgent) {
        this.setDisabled(!queueTab.selectedServiceProblems().length);
    }
});
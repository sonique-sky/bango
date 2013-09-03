Ext.define('Spm.controller.action.queue.BaseBulkAction', {
    extend: 'Spm.controller.action.BaseAction',

    performBulkOperation: function (operation, params, queueTab) {
        Ext.Ajax.request(
                {
                    url: 'api/queue/' + operation,
                    params: params,
                    success: function (response) {
                        queueTab.loadWith(response);
                    }
                }
        );
    },

    selectedServiceProblemIds: function (queueTab) {
        var selectedServiceProblems = queueTab.selectedServiceProblems();
        var serviceProblemIds = [];

        Ext.Array.forEach(selectedServiceProblems, function (item) {
            serviceProblemIds.push(item.get('serviceProblemId'));
        });

        return serviceProblemIds;
    }
});
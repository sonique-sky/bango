Ext.define('Spm.controller.action.queue.BulkClearAction', {
    extend: 'Spm.controller.action.queue.BaseBulkAction',

    requires: [
        'Spm.view.BulkClearDialog'
    ],

    startAction: function(queueTab) {
        var selectedServiceProblems = queueTab.selectedServiceProblems();
        var hasActiveTroubleReports = this.hasActiveTroubleReports(selectedServiceProblems);

        Ext.create('Spm.view.BulkClearDialog', {parentQueueTab: queueTab, hasActiveTroubleReports: hasActiveTroubleReports}).show();
    },

    finishAction: function (queueTab) {
        var serviceProblemIds = this.selectedServiceProblemIds(queueTab);

        this.performBulkOperation('bulkClear', {
            'originalQueueId': queueTab.getQueue().queueId(),
            'serviceProblemIds': serviceProblemIds
        }, queueTab);
    },

    hasActiveTroubleReports: function (selectedServiceProblems) {
        var serviceProblemsWithTroubleReports = Ext.Array.filter(selectedServiceProblems, function (serviceProblem) {
            return serviceProblem.get('hasActiveTroubleReport');
        });

        return serviceProblemsWithTroubleReports.length > 0;
    }
});

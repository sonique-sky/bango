Ext.define('Spm.view.common.BaseServiceProblemViewController', {
    extend: 'Ext.app.ViewController',

    doToggleHoldServiceProblem: function (serviceProblem, onSuccess) {
        var me = this;
        var action = serviceProblem.getWorkItem().isHeld() ? 'unhold' : 'hold';

        Ext.Ajax.request({
            url: Ext.String.format('api/serviceProblem/{0}/{1}', serviceProblem.serviceProblemId(), action),
            method: 'PUT',
            success: function (response) {
                onSuccess(response);
                me.fireEvent('serviceProblemHoldToggled', serviceProblem.serviceProblemId());
            }
        });

    },

    doSetWorkReminder: function (serviceProblem, onSuccess) {
        Ext.create('Spm.view.common.workreminder.WorkReminderDialog', {
            viewModel: {
                data: {serviceProblemId: serviceProblem.serviceProblemId()}
            }
        }).show();
    }

});
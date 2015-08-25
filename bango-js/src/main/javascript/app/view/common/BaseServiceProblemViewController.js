Ext.define('Spm.view.common.BaseServiceProblemViewController', {
    extend: 'Ext.app.ViewController',

    onToggleHoldServiceProblemFromMyItems: function (btn) {
        var me = this;
        var serviceProblem = btn.getWidgetRecord();

        this.doToggleHoldServiceProblem(
            serviceProblem,
            function() {
                me.fireEvent('serviceProblemHoldToggled', serviceProblem.serviceProblemId());
            }
        );
    },

    onToggleHoldServiceProblemFromTab: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var serviceProblem = this.getViewModel().get('serviceProblem');

        this.doToggleHoldServiceProblem(
            serviceProblem,
            function (response) {
                var decodedResponse = Ext.JSON.decode(response.responseText);
                var serviceProblem = ServiceProblemReader.read(decodedResponse).getRecords()[0];
                viewModel.set('serviceProblem', serviceProblem);
                viewModel.set('workItem', serviceProblem.getWorkItem());

                me.fireEvent('serviceProblemHoldToggled', serviceProblem.serviceProblemId());
            }
        );
    },

    doToggleHoldServiceProblem: function (serviceProblem, onSuccess) {
        var action = serviceProblem.getWorkItem().isHeld() ? 'unhold' : 'hold';

        Ext.Ajax.request(
            {
                url: Ext.String.format('api/serviceProblem/{0}/{1}', serviceProblem.serviceProblemId(), action),
                method: 'PUT',
                success: onSuccess
            }
        );

    },

    onSetWorkReminder: function (btn) {
    }

});
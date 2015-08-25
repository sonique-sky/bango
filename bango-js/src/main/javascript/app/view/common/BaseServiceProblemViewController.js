Ext.define('Spm.view.common.BaseServiceProblemViewController', {
    extend: 'Ext.app.ViewController',

    onToggleHoldServiceProblemFromWidget: function (btn) {
        var serviceProblem = btn.getWidgetRecord();

        this.doToggleHoldServiceProblem(serviceProblem);
    },

    onToggleHoldServiceProblemFromToolbar: function (btn) {
        var serviceProblem = this.getViewModel().get('serviceProblem');

        this.doToggleHoldServiceProblem(serviceProblem);
    },

    doToggleHoldServiceProblem: function(serviceProblem) {
        this.fireEvent('serviceProblemHoldToggled', serviceProblem.serviceProblemId());
    },

    onSetWorkReminder: function (btn) {
    }

});
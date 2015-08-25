Ext.define('Spm.view.myitems.MyItemsTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myItems',

    listen: {
        controller: {
            'serviceProblemTab': {
                serviceProblemPulled: 'onServiceProblemPulled'
            }
        }
    },

    onTabAdded: function() {
        this.loadMyItems();
    },

    onCellClicked: function (view, td, cellIndex, record) {
        if (cellIndex > 1) {
            this.fireEvent('serviceProblemSelected', record.serviceProblemId());
        }
    },

    onHoldServiceProblem: function (btn) {
        this.fireEvent('holdServiceProblem', btn.getWidgetRecord())
    },

    onSetWorkReminder: function (btn) {
        this.fireEvent('setWorkReminder', btn.getWidgetRecord())
    },

    onServiceProblemPulled: function() {

    },

    loadMyItems: function() {
        this.getViewModel().get('myItems').load()
    }

});
Ext.define('Spm.view.myitems.MyItemsTabViewController', {
    extend: 'Spm.view.common.BaseServiceProblemViewController',
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

    onServiceProblemPulled: function() {

    },

    loadMyItems: function() {
        this.getViewModel().get('myItems').load()
    }

});
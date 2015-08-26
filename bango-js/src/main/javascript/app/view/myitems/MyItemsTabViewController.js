Ext.define('Spm.view.myitems.MyItemsTabViewController', {
    extend: 'Spm.view.common.BaseServiceProblemViewController',
    alias: 'controller.myItems',

    listen: {
        controller: {
            'serviceProblemTab': {
                serviceProblemPulled: 'onServiceProblemPulled',
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled'
            },
            'myItems': {
                serviceProblemHoldToggled: 'onServiceProblemHoldToggled'
            }
        }
    },

    onToggleHoldWidgetAttach: function (column, widget, serviceProblem) {
        if (serviceProblem.getWorkItem().isHeld()) {
            widget.setIconCls('icon-release')
            widget.setTooltip('Unhold this Work Item');
        } else {
            widget.setIconCls('icon-hold');
            widget.setTooltip('Hold this Work Item');
        }
    },

    onToggleHoldServiceProblem: function (btn) {
        this.doToggleHoldServiceProblem(
            btn.getWidgetRecord(),
            Ext.emptyFn
        );
    },

    onSetWorkReminder: function (btn) {
        this.doSetWorkReminder(
            btn.getWidgetRecord(),
            Ext.emptyFn
        )
    },

    onServiceProblemHoldToggled: function () {
        this.loadMyItems();
    },

    onTabAdded: function () {
        this.loadMyItems();
    },

    onCellClicked: function (view, td, cellIndex, record) {
        if (cellIndex > 1) {
            this.fireEvent('serviceProblemSelected', record.serviceProblemId());
        }
    },

    onServiceProblemPulled: function () {
        this.loadMyItems();
    },


    loadMyItems: function () {
        this.getViewModel().get('myItems').load()
    },

    formattedWorkItemCreatedDate: function (val, meta, record) {
        return Ext.util.Format.date(record.getWorkItem().get('createdDate'), 'd/m/y H:i');
    }

});
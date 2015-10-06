Ext.define('Spm.view.serviceproblem.eventhistory.filter.FilterEventHistoryDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.filterEventHistoryDialog',

    onAccept: function () {
        var viewModel = this.getViewModel();
        var grid = this.lookupReference('eventTypeGrid');

        viewModel.set('currentFilterState.selectedEventTypes', grid.getSelection().map(function (selection) {
            var eventType = selection.get('eventType');
            return eventType;
        }));
        this.closeView();
    },

    updateButtonText: function (selected) {
        var button = this.lookupReference('selectAllClearAllButton');
        if (selected.length === 0) {
            button.setText('Select All');
        } else {
            button.setText('Clear All');
        }
    },

    onGridSelectionChange: function (grid, selected) {
        this.updateButtonText(selected);
    },

    onSelectAllClearAll: function (button) {
        var eventTypeGrid = this.lookupReference('eventTypeGrid');
        if (button.getText() === 'Select All') {
            eventTypeGrid.getSelectionModel().selectAll(false);
        } else {
            eventTypeGrid.getSelectionModel().deselectAll(false);
        }
    },

    onGridViewReady: function () {
        var me = this,
            selectedRows = [],
            eventTypeGrid = this.lookupReference('eventTypeGrid'),
            selectedEventTypes = this.getViewModel().get('currentFilterState.selectedEventTypes');

        me.updateButtonText(selectedEventTypes);

        me.getViewModel().get('eventTypes').queryBy(function (record) {
            var contains = Ext.Array.contains(selectedEventTypes, record.get('eventType'));
            if (contains) {
                selectedRows.push(record);
            }
            return contains;
        });

        eventTypeGrid.getSelectionModel().select(selectedRows, false, false);
    }

});

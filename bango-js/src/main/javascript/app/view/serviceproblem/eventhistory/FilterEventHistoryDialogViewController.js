Ext.define('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialogViewController', {
    extend: 'Spm.view.component.StandardDialogViewController',
    alias: 'controller.filterEventHistoryDialog',

    onAccept: function () {
        var viewModel = this.getViewModel();
        var grid = this.lookupReference('eventTypeGrid');

        viewModel.set('currentFilterState.selectedEventTypes', grid.getSelection());

        this.getView().close();
    },

    onFilterEventHistorySelectAllEventTypesToggle: function (button, state) {
        if (state) {
            button.setText('Clear All');
        } else {
            button.setText('Select All');
        }
    },

    onGridViewReady: function() {
        var eventTypeGrid = this.lookupReference('eventTypeGrid');

        var selectedEventTypes = this.getViewModel().get('currentFilterState.selectedEventTypes');

        eventTypeGrid.getSelectionModel().select(selectedEventTypes, false, true);
    }

});
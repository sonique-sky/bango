Ext.define('Spm.view.serviceproblem.eventhistory.FilterEventHistoryDialogViewController', {
    extend: 'Spm.view.component.StandardDialogViewController',
    alias: 'controller.filterEventHistoryDialog',

    control: {
        '#selectedEventHistoryFilter': {
            selectionchange: 'onEventHistoryItemTypeSelectionChanged'
        }
    },

    onEventHistoryItemTypeSelectionChanged: function (field, selection) {
        this.getViewModel().set('historyItemTypes', selection);

        if (selection.length === 1 && selection[0].get('eventType') === 'Note') {
            this.fireEvent('eventHistoryNotesOnlyFilterThing');
        } else {
            this.fireEvent('eventHistoryNotNotesOnlyFilterThing');
        }
    },

    onAccept: function () {
        this.fireEvent('eventHistoryNoteFilter', this.getViewModel().get('historyItemTypes'));
        this.getView().close();
    },

    onFilterEventHistorySelectAllEventTypesToggle: function (button, state) {
        if (state) {
            button.setText('Clear All');
        } else {
            button.setText('Select All');
        }
    }

});
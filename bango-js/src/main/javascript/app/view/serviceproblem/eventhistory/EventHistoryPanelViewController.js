Ext.define('Spm.view.serviceproblem.eventhistory.EventHistoryPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventHistoryPanel',

    listen: {
        controller: {
            addNoteDialog: {
                eventHistoryNoteAdded: 'onEventHistoryNoteAdded'
            }
        }
    },

    selectedEventTypesBinding: null,

    init: function () {
        this.selectedEventTypesBinding = this.getViewModel().bind('{currentFilterState.selectedEventTypes}', this.applyFilter);
    },

    destroy: function () {
        this.selectedEventTypesBinding.destroy();
        this.callParent();
    },

    applyFilter: function (selectedEventTypes) {
        var store = this.getStore('eventHistory');
        store.clearFilter();

        if (selectedEventTypes.length > 0) {
            store.filterBy(function (record) {
                return selectedEventTypes.some(function (value) {
                    return record.get('eventType') === value.get('eventType');
                });
            });
        }
    },

    onServiceProblemLoaded: function (serviceProblemId) {
        var viewModel = this.getViewModel();
        viewModel.clearSelectedEvents();
        this.getStore('eventHistory').load({params: {serviceProblemId: serviceProblemId}});
    },

    onEventHistoryNoteAdded: function (response) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.loadRawData(response, false);
    },

    onEventHistoryAddNote: function () {
        var dialog = this.getView().add({xtype: 'addNoteDialog'});
        dialog.show();
    },

    onEventHistoryRefresh: function () {
        this.getViewModel().getStore('eventHistory').reload();
    },

    onEventHistoryNotesOnly: function () {
        var viewModel = this.getViewModel();

        var filterActive = viewModel.get('notesOnlyFilterActive');
        if (filterActive) {
            var filterStateWithoutNotes = viewModel.get('currentFilterState.selectedEventTypes').filter(function (item) {
                return item.get('eventType') !== 'Note';
            });
            viewModel.setSelectedEvents(filterStateWithoutNotes);
        } else {
            var noteEventType = viewModel.getStore('eventTypes').findRecord('eventType', 'Note');
            viewModel.setSelectedEvents([noteEventType]);
        }
    },

    onEventHistoryLoaded: function (eventHistory) {
        var eventTypes = this.getViewModel().getStore('eventTypes');
        eventTypes.removeAll(true);

        var eventTypeData = eventHistory
                .collect('eventType', false, true)
                .map(function (item) {
                    return {eventType: item};
                });

        eventTypes.loadRawData(eventTypeData);
    },

    onEventHistoryFilter: function () {
        var dialog = this.getView().add({
            xtype: 'filterEventHistoryDialog'
        });

        dialog.show();
    }
});
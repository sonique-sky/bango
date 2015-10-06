Ext.define('Spm.view.serviceproblem.eventhistory.EventHistoryPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventHistoryPanel',

    requires: [
        'Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialog',
        'Spm.view.serviceproblem.eventhistory.filter.FilterEventHistoryDialog'
    ],

    listen: {
        controller: {
            addNoteDialog: {
                eventHistoryNoteAdded: 'onEventHistoryNoteAdded'
            }
        }
    },

    selectedEventTypesBinding: null,

    initViewModel: function (viewModel) {
        var eventHistoryProxy = viewModel.get('eventHistoryProxy');
        viewModel.getStore('eventHistory').setProxy(eventHistoryProxy);
        this.selectedEventTypesBinding = viewModel.bind('{currentFilterState.selectedEventTypes}', this.applyFilter);
    },

    destroy: function () {
        if (this.selectedEventTypesBinding !== null) {
            this.selectedEventTypesBinding.destroy();
        }
        this.callParent();
    },

    applyFilter: function (selectedEventTypes) {
        var store = this.getStore('eventHistory');
        store.clearFilter();

        if (selectedEventTypes.length > 0) {
            store.filterBy(function (record) {
                return selectedEventTypes.some(function (value) {
                    return record.get('eventType') === value;
                });
            });
        }
    },

    onServiceProblemLoaded: function (entityIdentifier) {
        var viewModel = this.getViewModel();
        viewModel.clearSelectedEvents();
        this.getViewModel().set('entityIdentifier', entityIdentifier);
        this.getStore('eventHistory').setEntityIdentifier(entityIdentifier);
        this.getStore('eventHistory').load();
    },

    onEventHistoryNoteAdded: function (response) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.loadRawData(response, false);
    },

    onEventHistoryAddNote: function () {
        this.getView().add({xtype: 'addNoteDialog', entityIdentifier: this.getViewModel().get('entityIdentifier')}).show();
    },

    onEventHistoryRefresh: function () {
        this.getViewModel().getStore('eventHistory').reload();
    },

    onEventHistoryNotesOnly: function () {
        var viewModel = this.getViewModel();

        if (viewModel.get('notesOnlyFilterActive')) {
            viewModel.clearSelectedEvents();
        } else {
            viewModel.setSelectedEvents(['Note']);
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
        this.getView().add({xtype: 'filterEventHistoryDialog'}).show();
    }

});

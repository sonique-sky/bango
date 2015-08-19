Ext.define('Spm.view.serviceproblem.EventHistoryPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventHistoryPanel',

    listen: {
        controller: {
            addNoteDialog: {
                eventHistoryNoteAdded: 'onEventHistoryNoteAdded'
            },
            serviceProblemTab: {
                serviceProblemLoaded: 'onServiceProblemLoaded'
            },
            eventHistoryPanel: {
                eventHistoryNoteFilter: 'onEventHistoryNoteFilter'
            },
            filterEventHistoryDialog: {
                eventHistoryNoteFilter: 'onEventHistoryNoteFilter',
                eventHistoryNotesOnlyFilterThing: 'onEventHistoryNotesOnlyFilterThing',
                eventHistoryNotNotesOnlyFilterThing: 'onEventHistoryNotNotesOnlyFilterThing'
            }
        }
    },

    selectedEventTypesBinding: null,

    init: function () {
        this.selectedEventTypesBinding = this.getViewModel().bind('{currentFilterState.selectedEventTypes}', function (selectedEventTypes) {
            var store = this.getStore('eventHistory');
            store.clearFilter();

            if (selectedEventTypes.length > 0) {
                store.filterBy(function (record) {
                    return 0 !== selectedEventTypes.filter(function (value) {
                            return record.get('eventType') === value.get('eventType');
                        }).length;
                });
            }
        });
    },

    destroy: function() {
        this.selectedEventTypesBinding.destroy();

        this.callParent();
    },

    onServiceProblemLoaded: function (serviceProblemId) {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.load({params: {serviceProblemId: serviceProblemId}});
    },

    onEventHistoryNotesOnlyFilterThing: function () {
        var notesOnlyToggleButton = this.lookupReference('notesOnlyToggleButton');
        notesOnlyToggleButton.toggle(true, true);
    },

    onEventHistoryNotNotesOnlyFilterThing: function () {
        var notesOnlyToggleButton = this.lookupReference('notesOnlyToggleButton');
        notesOnlyToggleButton.toggle(false, true);
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

    onEventHistoryNoteFilter: function (selection) {
        //var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        //eventHistoryStore.clearFilter();

        //if (selection !== null && selection.length > 0) {
        //    eventHistoryStore.filterBy();
        //}
    },


    onEventHistoryNotesOnly: function () {
        var viewModel = this.getViewModel();

        var filterActive = viewModel.get('notesOnlyFilterActive');
        if (filterActive) {
            var filterStateWithoutNotes = viewModel.get('currentFilterState.selectedEventTypes').filter(function (item) {
                return item.get('eventType') !== 'Note';
            });
            viewModel.set('currentFilterState.selectedEventTypes', filterStateWithoutNotes);
        } else {
            var noteEventType = viewModel.getStore('eventTypes').findRecord('eventType', 'Note');
            viewModel.set('currentFilterState.selectedEventTypes', [noteEventType]);
        }
    },

    onEventHistoryLoaded: function (eventHistory) {
        var eventTypes = this.getViewModel().getStore('eventTypes');
        eventTypes.removeAll(true);

        var eventTypeData = [];
        eventHistory.collect('eventType', false, true).forEach(function (item) {
            eventTypeData.push({eventType: item})
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
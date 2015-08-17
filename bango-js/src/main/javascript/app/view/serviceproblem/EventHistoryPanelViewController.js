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
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');
        eventHistoryStore.clearFilter();

        if (selection !== null && selection.length > 0) {
            eventHistoryStore.filterBy(function (record) {
                return 0 !== selection.filter(function (value) {
                        return record.get('eventType') === value.get('eventType');
                    }).length;
            });
        }
    },

    onEventHistoryNotesOnly: function (button, filterActive) {
        if (!filterActive) {
            this.fireEvent('eventHistoryNoteFilter', null);
        } else {
            this.fireEvent('eventHistoryNoteFilter', [Ext.create('Spm.model.EventHistoryItemType', {eventType: 'Note'})]);
        }
    },

    onEventHistoryFilter: function () {
        var eventHistoryStore = this.getViewModel().getStore('eventHistory');

        var eventHistoryItems = [];
        eventHistoryStore.collect('eventType', false, true).forEach(function (item) {
            eventHistoryItems.push(
                Ext.create('Spm.model.EventHistoryItemType', {eventType: item, selected: false}));
        });

        var allEventTypeStore = Ext.create('Ext.data.ArrayStore', {
            alias: 'store.eventType',
            model: 'Spm.model.EventHistoryItemType',
            data: eventHistoryItems,
            autoCreated: true
        });

        var dialog = this.getView().add({
            xtype: 'filterEventHistoryDialog',
            viewModel: {
                stores: {
                    eventTypes: allEventTypeStore
                }
            }
        });

        dialog.show();
    }
});
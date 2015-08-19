Ext.define('Spm.view.serviceproblem.EventHistoryPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventHistoryPanel',

    stores: {
        eventHistory: {
            type: 'eventHistory',
            listeners: {
                load: 'onEventHistoryLoaded'
            }
        },
        eventTypes: {
            fields: [
                'eventType'
            ]
        }
    },

    data: {
        currentFilterState: {
            selectedEventTypes: []
        }
    },

    formulas: {
        notesOnlyFilterActive: {
            bind: {
                bindTo: '{currentFilterState.selectedEventTypes}',
                deep: true
            },
            get: function (selectedEventTypes) {
                return selectedEventTypes.length === 1 && selectedEventTypes[0].get('eventType') === 'Note';
            }
        },
        applyEventTypeFilter: {
            bind: {
                bindTo: '{currentFilterState.selectedEventTypes}',
                deep: true
            },
            get: function (selectedEventTypes) {
                var store = this.getStore('eventHistory');
                store.clearFilter();

                if (selectedEventTypes.length > 0) {
                    store.filterBy(function (record) {
                        return 0 !== selectedEventTypes.filter(function (value) {
                                return record.get('eventType') === value.get('eventType');
                            }).length;
                    });
                }
            }
        }
    }
});

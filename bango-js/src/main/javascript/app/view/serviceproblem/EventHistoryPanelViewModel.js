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
            ],
            sorters: 'eventType'
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
        }
    },

    clearSelectedEvents: function () {
        this.set('currentFilterState.selectedEventTypes', [])
    }
});

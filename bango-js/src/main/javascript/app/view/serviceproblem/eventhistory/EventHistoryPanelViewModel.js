Ext.define('Spm.view.serviceproblem.eventhistory.EventHistoryPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventHistoryPanel',

    requires: [
        'Spm.model.EventHistoryItem',
        'Spm.proxy.ServiceProblemEventHistoryProxy'
    ],

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
        },
        serviceProblemId: null
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
        this.setSelectedEvents([]);
    },

    setSelectedEvents: function (eventTypes) {
        this.set('currentFilterState.selectedEventTypes', eventTypes)
    }
});

Ext.define('Spm.view.serviceproblem.eventhistory.EventHistoryPanelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventHistoryPanel',

    stores: {
        eventHistory: {
            type: 'eventHistory',
            pageSize: 0,
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
                return selectedEventTypes.length === 1 && selectedEventTypes[0] === 'Note';
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

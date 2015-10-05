Ext.define('Spm.view.dashboard.msp.MspDashboardTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mspDashboard',

    requires: [
        'Spm.view.dashboard.msp.create.CreateMspDialog'
    ],

    listen: {
        controller: {
            'createMspDialog': {
                refreshMspGrid: 'loadStore'
            }
        }
    },

    loadStore: function () {
        var me = this,
            store = this.getViewModel().getStore('mspDashboardEntries'),
            view = this.getView();

        store.removeFilter('hideManuallyCreated');
        store.filter('showRecentlyClosed', false);

        view.lookupReference('hideManuallyCreated').setValue(false);
        view.lookupReference('showRecentlyClosed').setValue(false);

        store.load({
            scope: this,
            callback: function (records, operation, success) {
                me.selectFirstMsp(store);
            }
        });

    },

    selectMajorServiceProblem: function (component, td, cellIndex, record) {
        var eventHistoryPanel = this.lookupReference('eventHistoryPanel');
        eventHistoryPanel.fireEvent('serviceProblemLoaded', record.getId());
    },

    showRecentlyClosed: function (checkbox, checked) {
        var store = this.getViewModel().getStore('mspDashboardEntries');
        store.filter('showRecentlyClosed', checked);
        this.getViewModel().set('displayRecentlyClosed', checked);
    },

    hideManuallyCreated: function (checkbox, checked) {
        var store = this.getViewModel().getStore('mspDashboardEntries');
        checked ? store.filter('hideManuallyCreated', true) : store.removeFilter('hideManuallyCreated');
    },

    viewAssociatedServiceProblems: function (button, event) {
    },

    createMsp: function () {
        this.getView().add({xtype: 'createMspDialog'}).show();
    },

    showAssociatedServiceProblems: function (cell, record, item, index, e, eOpts) {
    },

    closeMsp: function (button, event) {
        var me = this,
            selectedMsp = me.selectedMsp(),
            id = selectedMsp.get('id');

        if (selectedMsp) {
            Ext.Msg.show({
                title: 'Confirm Close MSP',
                msg: Ext.String.format('Do you want to close MSP #{0}?', id),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                callback: function (buttonId) {
                    if ('yes' == buttonId) {
                        Ext.Ajax.request({
                            url: Ext.String.format('api/msp/{0}/close', id),
                            method: 'PUT',
                            callback: function () {
                                me.loadStore();
                            }
                        });
                    }
                }
            });
        }

    },

    selectFirstMsp: function (store) {
        return this.lookupReference('mspGridPanel').setSelection(store.first());
    },

    selectedMsp: function () {
        return this.lookupReference('mspGridPanel').getSelectionModel().getSelection()[0];
    }

});
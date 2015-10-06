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
        var store = this.getViewModel().getStore('mspDashboardEntries'),
            view = this.getView();

        store.removeFilter('hideManuallyCreated');
        store.filter('showRecentlyClosed', false);

        view.lookupReference('hideManuallyCreated').setValue(false);
        view.lookupReference('showRecentlyClosed').setValue(false);

        store.load();
    },

    storeLoaded: function (store, records) {
        var me = this;
        me.selectFirstMajorServiceProblem(store);
        me.lookupReference('eventHistoryPanel').fireEvent('serviceProblemLoaded', me.getViewModel().selectedMsp().getId());
    },

    showRecentlyClosed: function (checkbox, checked) {
        var me = this,
            store = me.getViewModel().getStore('mspDashboardEntries');

        store.filter('showRecentlyClosed', checked);
        me.getViewModel().set('displayRecentlyClosed', checked);
    },

    hideManuallyCreated: function (checkbox, checked) {
        var me = this,
            store = me.getViewModel().getStore('mspDashboardEntries');
        checked ? store.filter('hideManuallyCreated', true) : store.removeFilter('hideManuallyCreated');
    },

    selectMajorServiceProblem: function (component, td, cellIndex, record) {
        this.getViewModel().set('selectedMsp', record);
        this.lookupReference('eventHistoryPanel').fireEvent('serviceProblemLoaded', record.getId());
    },

    selectFirstMajorServiceProblem: function (store) {
        var mspGridPanel = this.lookupReference('mspGridPanel');
        mspGridPanel.setSelection(store.first());
        this.getViewModel().set('selectedMsp', store.first());
    },

    viewAssociatedServiceProblems: function () {
        var me = this;
        me.fireEvent('search', {
            property: 'mspId',
            value: me.getViewModel().selectedMsp().getId()
        });
    },

    createMsp: function () {
        this.getView().add({xtype: 'createMspDialog'}).show();
    },

    closeMsp: function () {
        var me = this,
            selectedMsp = me.getViewModel().selectedMsp(),
            mspId = selectedMsp.get('id');

        if (selectedMsp) {
            Ext.Msg.show({
                title: 'Confirm Close MSP',
                msg: Ext.String.format('Do you want to close MSP #{0}?', mspId),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                callback: function (buttonId) {
                    if ('yes' == buttonId) {
                        Ext.Ajax.request({
                            url: Ext.String.format('api/msp/{0}/close', mspId),
                            method: 'PUT',
                            callback: function () {
                                me.loadStore();
                            }
                        });
                    }
                }
            });
        }
    }

});
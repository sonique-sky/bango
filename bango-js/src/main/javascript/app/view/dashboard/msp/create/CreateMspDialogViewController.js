Ext.define('Spm.view.dashboard.msp.create.CreateMspDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createMspDialog',

    onAccept: function () {
        var me = this,
            detailedNoteField = me.lookupReference('mspDetailedNote').getValue(),
            expectedResolutionDateField = me.lookupReference('mspExpectedResolutionDate').getValue(),
            descriptionField = me.lookupReference('mspDescription').getValue(),
            startTimeField = me.lookupReference('mspStartTime').getValue(),
            startDateField = me.lookupReference('mspStartDate').getValue(),
            startDate = new Date();

        startDate.setDate(startDateField.getDate());
        startDate.setMonth(startDateField.getMonth());
        startDate.setYear(startDateField.getFullYear());
        startDate.setHours(startTimeField.getHours());
        startDate.setMinutes(startTimeField.getMinutes());
        startDate.setSeconds(0);

        Ext.Ajax.request({
            url: 'api/msp',
            jsonData: {
                startDate: startDate,
                detailedNote: detailedNoteField,
                expectedResolutionDate: expectedResolutionDateField,
                description: descriptionField
            },
            method: 'POST',
            callback: function () {
                me.fireEvent('refreshMspGrid');
                me.closeView();
            }
        });
    },

    onValidityChange: function (form, isValid) {
        this.getViewModel().set('acceptButtonDefaultDisabled', !isValid);
    }

});
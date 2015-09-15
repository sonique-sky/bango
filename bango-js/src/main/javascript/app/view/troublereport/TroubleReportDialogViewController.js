Ext.define('Spm.view.troublereport.TroubleReportDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.troubleReportDialog',

    listen: {
        controller: {
            'requestAppointmentDialog': {
                updateAppointmentReference: 'onUpdateAppointmentReference'
            }
        }
    },

    onShow: function () {
        var serviceType = this.getViewModel().get('troubleReportTemplate.serviceType');
        var serviceId = this.getViewModel().get('troubleReportTemplate.serviceId');
        this.getViewModel().getStore('testProducts').load({
            params: {
                serviceType: serviceType.code
            }
        });
        this.getViewModel().getStore('symptoms').load({
            params: {
                serviceType: serviceType.code
            }
        });
        this.getViewModel().getStore('lineTest').load({
            params: {
                serviceId: serviceId
            }
        });

        var troubleReportForm = this.lookupReference('troubleReportForm');
        var shortDescriptionField = this.lookupReference('shortDescription');
        var symptomCodeField = this.lookupReference('symptomCode');
        var contactNumberField = this.lookupReference('contactNumber');
        var secondaryContactNameField = this.lookupReference('secondaryContactName');
        var secondaryContactNumberField = this.lookupReference('secondaryContactNumber');
        var temporaryCallDiversionNumberField = this.lookupReference('temporaryCallDiversionNumber');
        var testProductField = this.lookupReference('testProduct');
        var additionalNotesField = this.lookupReference('additionalNotes');
        var structuredQuestionCodeField = this.lookupReference('structuredQuestionCode');

        var maxInputLength = ('RoiOffnetVoice' === serviceType.code
        || 'RoiRuralOffnetBroadband' === serviceType.code
        || 'RoiUrbanOffnetBroadband' === serviceType.code
        || 'RoiFttc' === serviceType.code) ? 150 : 2000;

        shortDescriptionField.validator = Ext.bind(this.requiredValueValidator, this, [
            shortDescriptionField,
            serviceType,
            ['NvnVoice', 'NvnData', 'OffnetBroadband', 'OnnetBroadband', 'WLR', 'FTTC', 'WifiDataService']
        ]);

        symptomCodeField.validator = Ext.bind(this.requiredValueValidator, this, [
            symptomCodeField,
            serviceType,
            ['WLR3', 'RoiOffnetVoice', 'RoiRuralOffnetBroadband', 'RoiUrbanOffnetBroadband', 'RoiFttc']
        ]);

        testProductField.validator = Ext.bind(this.requiredValueValidator, this, [
            testProductField,
            serviceType,
            ['NvnVoice', 'NvnData', 'OffnetBroadband', 'OnnetBroadband', 'WLR', 'FTTC', 'WifiDataService']
        ]);

        secondaryContactNameField.validator = Ext.bind(this.requiredValueValidator, this, [
            secondaryContactNameField,
            serviceType,
            ['WLR3']
        ]);

        contactNumberField.validator = Ext.bind(
            this.telephoneNumberValidator,
            this,
            [contactNumberField, serviceType]
        );

        secondaryContactNumberField.validator = Ext.bind(
            this.telephoneNumberValidator,
            this,
            [secondaryContactNumberField, serviceType]
        );

        temporaryCallDiversionNumberField.validator = Ext.bind(
            this.telephoneNumberValidator,
            this,
            [temporaryCallDiversionNumberField, serviceType]
        );

        structuredQuestionCodeField.validator = Ext.bind(this.requiredValueValidator, this, [structuredQuestionCodeField, serviceType, ['FTTC']]);
        additionalNotesField.validator = Ext.bind(this.maxNotesLengthValidator, this, [additionalNotesField, maxInputLength]);

        troubleReportForm.isValid();
    },

    maxNotesLengthValidator: function (additionalNotesField, maxInputLength) {
        return additionalNotesField.getValue() && additionalNotesField.getValue().length >= maxInputLength ? "The max length for notes is " + maxInputLength : true;
    },

    requiredValueValidator: function (field, serviceType, requiredForServiceTypes) {
        if (requiredForServiceTypes.indexOf(serviceType.code) > -1) {
            if (field.getValue() === null || field.getValue() === "") {
                return "This field is required"
            }
        }
        return true;
    },

    telephoneNumberValidator: function (field, serviceType) {
        var btiRegex = new RegExp("0[0-9]{1,3}-?[0-9]{5,8}$");
        var btRegex = new RegExp("0[0-9]{9,10}$");

        if ('RoiOffnetVoice' === serviceType.code
            || 'RoiRuralOffnetBroadband' === serviceType.code
            || 'RoiUrbanOffnetBroadband' === serviceType.code
            || 'RoiFttc' === serviceType.code) {
            return btiRegex.test(field.getValue()) ? true : 'Invalid phone number - must be numeric, start with 0 and be up to 12 digits';
        }
        return btRegex.test(field.getValue()) ? true : 'Invalid phone number - must be numeric, start with 0 and be either 10 or 11 digits';
    },

    onUpdateAppointmentReference: function (appointmentReference) {
        this.getViewModel().set('troubleReportTemplate.appointmentReference', appointmentReference);
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    },

    onExpand: function () {
        this.getViewModel().getStore('lineTest').reload();
    },

    onAccept: function () {
        if (this.lookupReference('troubleReportForm').isValid()) {
            var me = this,
                troubleReportTemplate = me.getViewModel().get('troubleReportTemplate'),
                serviceProblemId = me.getViewModel().get('serviceProblemId');

            troubleReportTemplate.copy(null).save({
                    scope: me,
                    success: function () {
                        me.fireEvent('troubleReportCreated', serviceProblemId);
                        me.closeView();
                    }
                }
            );
        }
    },

    onRequestAppointment: function () {
        Ext.create('Spm.view.troublereport.requestappointment.RequestAppointmentDialog', {
            viewModel: {
                data: {
                    serviceProblemId: this.getViewModel().get('troubleReportTemplate.serviceProblemId'),
                    serviceType: this.getViewModel().get('troubleReportTemplate.serviceType')
                }
            }
        }).show();
    }

});
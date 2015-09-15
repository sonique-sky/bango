Ext.define('Spm.view.serviceproblem.clear.ClearServiceProblemDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.clearServiceProblemDialog',

    data: {
        fault: null,
        cause: null,
        resolution: null
    },

    stores: {
        faults: {
            type: 'faults',
            autoLoad: false
        },
        causes: {
            type: 'causes',
            autoLoad: false
        },
        resolutionReasons: {
            type: 'resolutionReasons',
            autoLoad: false
        }
    },

    serviceProblem: function () {
        return this.get('serviceProblem');
    },

    fault: function () {
        return this.get('fault');
    },

    cause: function () {
        return this.get('cause');
    },

    resolution: function () {
        return this.get('resolution');
    }

});

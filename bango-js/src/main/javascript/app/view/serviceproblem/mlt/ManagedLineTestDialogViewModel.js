Ext.define('Spm.view.serviceproblem.mlt.ManagedLineTestDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.managedLineTestDialog',

    data: {
        questionWizard: [
            {
                reference: 'modemSyncLightQuestion',
                question: 'Is the modem sync light steady green, flashing or off?',
                answers: [
                    {answer: 'Steady Green', code: 'SteadyGreen'},
                    {answer: 'Flashing', code: 'Flashing'},
                    {answer: 'Off', code: 'Off'}
                ]
            },
            {
                reference: 'modemPowerLightQuestion',
                question: 'Is the modem power light on or off?',
                answers: [
                    {answer: 'On', code: 'On', nextQuestion: 'modemSyncLightQuestion'},
                    {answer: 'Off', code: 'Off'}
                ]
            },
            {
                reference: 'frequencyQuestion',
                question: 'Is the problem intermittent or permanent?',
                answers: [
                    {answer: 'Intermittent', code: 'Intermittent', nextQuestion: 'modemPowerLightQuestion'},
                    {answer: 'Permanent', code: 'Permanent', nextQuestion: 'modemPowerLightQuestion'}
                ]
            },
            {
                reference: 'damageTypeQuestion',
                question: 'Is the damage to the modem, internal wiring, external wiring or NTE?',
                answers: [
                    {answer: 'Modem', code: 'Modem'},
                    {answer: 'Internal Wiring', code: 'InternalWiring'},
                    {answer: 'External Wiring', code: 'ExternalWiring'},
                    {answer: 'NTE', code: 'NetworkTerminationEquipment'}
                ]
            },
            {
                reference: 'rootQuestion',
                question: 'Is the problem with the connection, performance or physical damage?',
                answers: [
                    {answer: 'Connection', code: 'Connection', nextQuestion: 'frequencyQuestion'},
                    {answer: 'Performance', code: 'Performance', nextQuestion: 'frequencyQuestion'},
                    {answer: 'Physical Damage', code: 'PhysicalDamage', nextQuestion: 'damageTypeQuestion'}
                ]
            }

        ],
        answeredQuestions: []
    },

    questionWizard: function () {
        return this.get('questionWizard');
    },

    answeredQuestions: function () {
        return this.get('answeredQuestions');
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    }

});
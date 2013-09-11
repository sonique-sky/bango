Ext.define('Spm.controller.action.serviceproblem.PullServiceProblemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.PullServiceProblemAction',

    statics: {
        ACTION_NAME: 'pull'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.PullServiceProblemAction.ACTION_NAME
        })]);
    },

    startAction: function (serviceProblemTab) {
        var me = this;

        Ext.Msg.show({
            title: 'Confirm Assign',
            msg: 'Yo Really Pull it?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            callback: function(buttonId) {
                if('yes' == buttonId) {
                    serviceProblemTab.fireEvent('accepted', me.name, serviceProblemTab)
                }
            }
        });
    },

    finishAction: function (serviceProblemTab) {
        console.log('yo - pulled!');
    }
});

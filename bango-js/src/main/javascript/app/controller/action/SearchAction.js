Ext.define('Spm.controller.action.SearchAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.SearchAction',

    statics: {
        ACTION_NAME: 'search'
    },

    requires: [
    ],

    constructor: function () {
        this.callParent([
            {
                name: Spm.action.SearchAction.ACTION_NAME,
                text: 'Search',
                disabled: true
            }
        ]);
    },

    startAction: function (searchPanel) {
        if (searchPanel.isValid()) {
            var radioGroup = searchPanel.down('radiogroup');
            var textField = searchPanel.down('textfield');
            var searchCriteria = Ext.apply(radioGroup.getValue(), {searchParameter: textField.getValue()});

            var operation = Spm.proxy.ApiOperation.search({params: searchCriteria});

            Spm.proxy.ServiceProblemApiProxy.read(operation, function (operation) {
                if (operation.wasSuccessful()) {
                    searchPanel.fireEvent('searchFinished', operation.getRecords(), operation.params);
                }
            }, this);
        }
    },

    updateState: function (searchPanel) {
        this.setDisabled(!searchPanel.isValid())
    }
});
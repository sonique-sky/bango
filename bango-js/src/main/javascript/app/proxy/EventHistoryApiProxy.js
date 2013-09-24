Ext.define('Spm.proxy.EventHistoryApiProxy', {
    extend: 'Spm.proxy.ApiProxy',

    singleton: true,

    model: 'Spm.model.EventHistoryItem',

    requires: [
        'Spm.model.EventHistoryItem'
    ]
});
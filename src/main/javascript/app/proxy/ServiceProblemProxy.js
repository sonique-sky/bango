Ext.define('Spm.proxy.ServiceProblemProxy', {
    extend: 'Ext.data.proxy.Ajax',

    model: 'Spm.model.ServiceProblem',
    reader: 'json',

    statics: {
        serviceProblemSearchProxy: function () {
            return Ext.create('Spm.proxy.ServiceProblemProxy', {url: 'api/search/simple'});
        },
        serviceProblemLookupProxy: function() {
            return Ext.create('Spm.proxy.ServiceProblemProxy', {url: 'api/serviceproblem/get'});
        }
    }
});
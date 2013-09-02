Ext.define('Spm.controller.Search', {
    extend: 'Ext.app.Controller',
    alias: 'controller.search',

    init: function () {
        this.listen({
            component: {
                'searchPanel': {
                    searchStarted: this.onSearchStarted,
                    searchFinished: this.onSearchFinished
                }
            }
        });
    },

    onSearchStarted: function(searchCriteria) {
    },

    onSearchFinished: function() {

    }
});
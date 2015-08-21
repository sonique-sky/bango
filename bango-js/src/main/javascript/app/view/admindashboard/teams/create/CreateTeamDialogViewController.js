Ext.define('Spm.view.admindashboard.teams.create.CreateTeamDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createTeamDialog',

    requires: [
        'Ext.window.MessageBox'
    ],

    onShow: function () {
        this.getViewModel().set('team', Ext.create('Spm.model.Team'));
    },

    onAccept: function () {
        var me = this;

        this.getViewModel().get('team').save({
            success: function (team) {
                me.getViewModel().get('teams').loadRecords([team], {addRecords: true});
                me.getView().close();
            }
        });
    }

});
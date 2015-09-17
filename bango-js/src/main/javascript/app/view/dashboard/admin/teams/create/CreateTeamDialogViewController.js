Ext.define('Spm.view.dashboard.admin.teams.create.CreateTeamDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createTeamDialog',

    onAccept: function () {
        var me = this;
        var newTeam = this.getViewModel().get('team');
        var teamsStore = this.getViewModel().get('teams');

        teamsStore.add(newTeam);
        teamsStore.sync({
            success: me.closeView,
            failure: teamsStore.rejectChanges
        });
    }

});

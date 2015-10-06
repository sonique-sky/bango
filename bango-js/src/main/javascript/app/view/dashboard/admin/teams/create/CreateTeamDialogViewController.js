Ext.define('Spm.view.dashboard.admin.teams.create.CreateTeamDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createTeamDialog',

    initViewModel: function (viewModel) {
        viewModel.set('team', this.getView().team);
    },

    onAccept: function () {
        var me = this,
            newTeam = me.getViewModel().get('team'),
            teamsStore = me.getViewModel().get('teams');

        teamsStore.add(newTeam);
        teamsStore.sync({
            scope: me,
            success: me.closeView,
            failure: function() {
                teamsStore.rejectChanges();
            }
        });
    }

});

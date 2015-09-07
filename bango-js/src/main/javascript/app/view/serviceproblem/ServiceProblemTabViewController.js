Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewController', {
    extend: 'Spm.view.common.BaseServiceProblemViewController',
    alias: 'controller.serviceProblemTab',

    requires: [
        'Spm.reader.ServiceProblemReader'
    ],

    onStaleData: function () {
        this.loadServiceProblem();
    },

    onServiceProblemTabClosed: function () {
        this.fireEvent('serviceProblemTabClosed', this.getViewModel().serviceProblemId());
    },

    onSetWorkReminder: function () {
        var serviceProblem = this.getViewModel().serviceProblem();
        this.doSetWorkReminder(serviceProblem, Ext.emptyFn);
    },

    onServiceProblemTabAdded: function () {
        var serviceProblem = this.getViewModel().serviceProblem();
        if (!serviceProblem) {
            this.loadServiceProblem();
        } else {
            this.displayServiceProblem(serviceProblem);
        }
    },

    onRefreshServiceProblem: function () {
        this.loadServiceProblem();
    },

    loadServiceProblem: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        Spm.model.ServiceProblem.load(serviceProblemId, {
            scope: this,
            success: this.displayServiceProblem
        });
    },

    displayServiceProblem: function (serviceProblem) {
        this.getViewModel().set('serviceProblem', serviceProblem);
        this.getViewModel().set('serviceProblemId', serviceProblem.serviceProblemId());
        this.getViewModel().set('workItem', serviceProblem.getWorkItem());

        var workItemPanel = this.lookupReference('workItemPanel');
        workItemPanel.fireEvent('switchWorkItem', serviceProblem);

        var eventHistoryPanel = this.lookupReference('eventHistoryPanel');
        eventHistoryPanel.fireEvent('serviceProblemLoaded', serviceProblem.serviceProblemId());
    },

    onPullServiceProblem: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Confirm Assign',
            msg: 'Do you want to assign this Work Item to yourself?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    var serviceProblem = me.getViewModel().serviceProblem();

                    Ext.Ajax.request({
                        url: Ext.String.format('api/serviceProblem/{0}/pull', serviceProblem.serviceProblemId()),
                        method: 'POST',
                        success: function (response) {
                            var serviceProblem = ServiceProblemReader.fromJsonString(response.responseText);
                            me.displayServiceProblem(serviceProblem);
                            me.fireEvent('serviceProblemPulled');

                            Ext.GlobalEvents.fireEvent('displayNotification', {
                                title: 'Service Problem Assigned',
                                message: Ext.String.format('Service Problem [{0}] has been assigned to you', serviceProblem.serviceProblemId())
                            });
                        }
                    });
                }
            }
        });
    },

    onCreateTroubleReport: function () {
        var me = this;

        var troubleReportTemplate = Ext.create('Spm.model.TroubleReportTemplate');
        troubleReportTemplate.load({
            params: {serviceProblemId: this.getViewModel().serviceProblemId()},
            success: function () {
                var dialog = me.getView().add({
                    xtype: 'troubleReportDialog',
                    viewModel: {
                        type: 'troubleReportDialog',
                        data: {
                            troubleReportTemplate: troubleReportTemplate
                        }
                    }
                });
                dialog.show();
            }
        });
    },

    onToggleHoldServiceProblem: function () {
        var me = this;
        var viewModel = this.getViewModel();

        this.doToggleHoldServiceProblem(
                viewModel.serviceProblem(),
                function (response) {
                    var serviceProblem = ServiceProblemReader.fromJsonString(response.responseText);
                    me.displayServiceProblem(serviceProblem);
                }
        );
    }
});

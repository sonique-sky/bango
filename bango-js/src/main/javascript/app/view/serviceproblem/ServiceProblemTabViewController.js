Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.serviceProblemTab',

    requires: [
        'Spm.reader.ServiceProblemReader'
    ],

    onServiceProblemTabClosed: function () {
        this.fireEvent('serviceProblemTabClosed', this.getViewModel().get('serviceProblemId'));
    },

    onServiceProblemTabAdded: function () {
        var viewModel = this.getViewModel();
        if (!viewModel.get('serviceProblem')) {
            this.loadServiceProblem();
        }
    },

    onRefreshServiceProblem: function () {
        this.loadServiceProblem();
    },

    loadServiceProblem: function () {
        var viewModel = this.getViewModel();
        var serviceProblemId = viewModel.get('serviceProblemId');
        Spm.model.ServiceProblem.load(serviceProblemId, {
            scope: this,
            success: function (serviceProblem) {
                viewModel.set('serviceProblem', serviceProblem);
                viewModel.set('workItem', serviceProblem.getWorkItem());

                this.switchWorkItemPanel();

                this.fireEvent('serviceProblemLoaded', serviceProblemId);
            }
        });
    },

    switchWorkItemPanel: function () {
        var viewModel = this.getViewModel();
        var serviceProblem = viewModel.get('serviceProblem');

        var layout = this.lookupReference('workItemPanel').getLayout();
        if (serviceProblem.hasWorkItem()) {
            layout.setActiveItem(1);
        } else {
            layout.setActiveItem(0);
        }
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
                    var viewModel = me.getViewModel();
                    var serviceProblem = viewModel.get('serviceProblem');

                    Ext.Ajax.request(
                        {
                            url: Ext.String.format('api/serviceProblem/{0}/pull', serviceProblem.serviceProblemId()),
                            method: 'POST',
                            success: function (response) {
                                var decodedResponse = Ext.JSON.decode(response.responseText);
                                var serviceProblem = ServiceProblemReader.read(decodedResponse).getRecords()[0];
                                viewModel.set('serviceProblem', serviceProblem);
                                viewModel.set('workItem', serviceProblem.getWorkItem());

                                me.onServiceProblemTabAdded();
                                me.fireEvent('serviceProblemPulled');
                                Ext.GlobalEvents.fireEvent('displayNotification', {
                                    title: 'Service Problem Assigned',
                                    message: Ext.String.format('Service Problem [{0}] has been assigned to you', serviceProblem.serviceProblemId())
                                });
                            }
                        }
                    );
                }
            }
        });
    },

    onCreateTroubleReport: function () {

    }

});
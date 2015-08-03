package sonique.bango.action;

import sonique.bango.app.SupermanApp;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import spm.domain.ServiceProblemId;

public class ViewTroubleReportAction implements BangoAction {
    private SupermanApp supermanApp;
    private ServiceProblemId serviceProblemId;

    @Override
    public void goBango() {
        ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(serviceProblemId);
        serviceProblemTab.tabContent().viewToolbar().viewTroubleReport().click();
    }
}

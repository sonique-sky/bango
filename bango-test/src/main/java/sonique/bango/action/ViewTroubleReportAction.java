package sonique.bango.action;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.app.SupermanApp;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;

public class ViewTroubleReportAction implements BangoAction {
    private final SupermanApp supermanApp;
    private final DomainServiceProblem serviceProblem;

    public ViewTroubleReportAction(SupermanApp supermanApp, DomainServiceProblem serviceProblem) {
        this.supermanApp = supermanApp;
        this.serviceProblem = serviceProblem;
    }

    @Override
    public void goBango() {
        ServiceProblemTab serviceProblemTab = supermanApp.appContainer().tab().serviceProblem(serviceProblem);
        serviceProblemTab.tabContent().viewToolbar().viewTroubleReport().click();
    }
}

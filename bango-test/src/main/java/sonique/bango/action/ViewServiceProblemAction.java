package sonique.bango.action;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.app.SupermanApp;

public class ViewServiceProblemAction implements BangoAction {
    private final SupermanApp supermanApp;
    private final DomainServiceProblem serviceProblem;

    public ViewServiceProblemAction(SupermanApp supermanApp, DomainServiceProblem serviceProblem) {
        this.supermanApp = supermanApp;
        this.serviceProblem = serviceProblem;
    }

    @Override
    public void goBoom() {
        supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());
    }
}
package sonique.bango.action;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.app.SupermanApp;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;

public class ViewServiceProblemAction implements BangoAction {
    private final SupermanApp supermanApp;
    private final DomainServiceProblem serviceProblem;

    public ViewServiceProblemAction(SupermanApp supermanApp, DomainServiceProblem serviceProblem) {
        this.supermanApp = supermanApp;
        this.serviceProblem = serviceProblem;
    }

    @Override
    public void goBango() {
        supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());
        assertThat(supermanApp.appContainer().tab().serviceProblem(serviceProblem), isDisplayed());
    }
}
package sonique.bango.troublereport;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.BangoActionUnderTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.troublereport.TroubleReportPanel;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemBuilder;

public class TroubleReportPanelTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        loginAgent();
        serviceProblem = serviceProblemBuilder().build();
    }

    @Test
    public void displaysTroubleReport() throws Exception {
        given(aServiceProblemExists());
        when(theAgentViewsTheTroubleReport());

        then(theOpenedTroubleReport(), isDisplayed()
                        .with(theServiceId())
                        .with(theStatusOf(TroubleReportStatus.New))
                        .with(theCorrectTestProduct())
        );

    }

    private Matcher<? super TroubleReportPanel> theCorrectTestProduct() {
        return null;
    }

    private Matcher<? super TroubleReportPanel> theServiceId() {
        return null;
    }

    private Matcher<TroubleReportPanel> theStatusOf(TroubleReportStatus expectedValue) {
        return null;
    }

    private AppendableAllOf<TroubleReportPanel> isDisplayed() {
        return null;
    }

    private StateExtractor<TroubleReportPanel> theOpenedTroubleReport() {
        return null;
    }

    private ActionUnderTest theAgentViewsTheTroubleReport() {
        new BangoActionUnderTest(new ViewServiceProblemAction(supermanApp, serviceProblem));
        return null;
    }

    private GivensBuilder aServiceProblemExists() {
        return scenarioGivensBuilderFor(serviceProblem);
    }
}

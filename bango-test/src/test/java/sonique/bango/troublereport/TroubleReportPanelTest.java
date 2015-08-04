package sonique.bango.troublereport;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportBuilder;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.BangoActionUnderTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.action.ViewTroubleReportAction;
import sonique.bango.driver.panel.troublereport.TroubleReportPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.testsupport.matchers.AppendableAllOf;
import util.SupermanDataFixtures;

import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemBuilder;
import static sonique.datafixtures.PrimitiveDataFixtures.pickOneOf;
import static spm.messages.bt.fixtures.TroubleReportDataFixtures.someShortDescription;

public class TroubleReportPanelTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;
    private DomainTroubleReport domainTroubleReport;

    @Before
    public void setUp() throws Exception {
        loginAgent();

        serviceProblem = serviceProblemBuilder().build();
        domainTroubleReport = new DomainTroubleReportBuilder()
                .withServiceProblem(serviceProblem)
                .withFaultCode(SupermanDataFixtures.someFaultCode().asString())
                .withTestProduct(pickOneOf(TestProduct.allValidFor(serviceProblem.getServiceType())))
                .withShortDescription(someShortDescription())
                .withStatus(TroubleReportStatus.New)
                .build();
        serviceProblem.addTroubleReport(domainTroubleReport);
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

    private AppendableAllOf<TroubleReportPanel> isDisplayed() {
        return IsDisplayed.<TroubleReportPanel>isDisplayed();
    }

    private Matcher<? super TroubleReportPanel> theCorrectTestProduct() {
        return new TypeSafeMatcher<TroubleReportPanel>() {
            @Override
            protected boolean matchesSafely(TroubleReportPanel panel) {
                return panel.testProduct() == domainTroubleReport.getTestProduct();
            }

            @Override
            public void describeTo(Description description) {
                description.appendText(domainTroubleReport.getTestProduct().asString());
            }
        };
    }

    private Matcher<? super TroubleReportPanel> theServiceId() {
        return new TypeSafeMatcher<TroubleReportPanel>() {
            @Override
            protected boolean matchesSafely(TroubleReportPanel panel) {
                return panel.serviceId() == domainTroubleReport.getServiceId();
            }

            @Override
            public void describeTo(Description description) {
                description.appendText(domainTroubleReport.getServiceId().asString());
            }
        };
    }

    private Matcher<TroubleReportPanel> theStatusOf(TroubleReportStatus expectedValue) {
        return new TypeSafeMatcher<TroubleReportPanel>() {
            @Override
            protected boolean matchesSafely(TroubleReportPanel item) {
                return item.status() == expectedValue;
            }

            @Override
            public void describeTo(Description description) {
                description.appendText(expectedValue.name());
            }
        };
    }

    private StateExtractor<TroubleReportPanel> theOpenedTroubleReport() {
        return inputAndOutputs -> supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().troubleReportPanel();
    }

    private ActionUnderTest theAgentViewsTheTroubleReport() {
        return (givens, capturedInputAndOutputs) -> {
            BangoActionUnderTest openServiceProblemAction = new BangoActionUnderTest(new ViewServiceProblemAction(supermanApp, serviceProblem));
            openServiceProblemAction.execute(givens, capturedInputAndOutputs);

            BangoActionUnderTest viewTroubleReportAction = new BangoActionUnderTest(new ViewTroubleReportAction(supermanApp, serviceProblem.serviceProblemId()));
            viewTroubleReportAction.execute(givens, capturedInputAndOutputs);
            return capturedInputAndOutputs;
        };
    }

    private GivensBuilder aServiceProblemExists() {
        return scenarioGivensBuilderFor(serviceProblem);
    }
}

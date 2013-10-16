package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemResolution;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.CoreMatchers.equalTo;
import static sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus.*;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.DateMatcher.theSameDateAs;
import static sonique.bango.matcher.panel.ServiceProblemPanelMatchers.*;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemBuilder;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemWithWorkItem;
import static sonique.bango.matcher.DescriptionOf.withDescriptionOf;
import static sonique.datafixtures.DateTimeDataFixtures.someDateInTheNextYear;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;
import static util.SupermanDataFixtures.someServiceProblemResolution;

public class ServiceProblemPanelTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void displaysOpenServiceProblem() throws Exception {
        given(anOpenServiceProblem());

        when(theAgentViewsTheServiceProblem());

        then(theServiceProblemPanel(), isDisplayed().with(theCorrectInformation()).and(aServiceProblemStatus(equalTo(Open))));
    }

    @Test
    public void displaysClearedServiceProblem() throws Exception {
        given(aClearedServiceProblem());

        when(theAgentViewsTheServiceProblem());

        then(theServiceProblemPanel(), isDisplayed().with(theCorrectInformation())
                .and(aServiceProblemStatus(equalTo(Cleared)))
                .and(theFaultCauseAndResolutionReason()));
    }

    @Test
    public void displaysClosedServiceProblem() throws Exception {
        given(aClosedServiceProblem());

        when(theAgentViewsTheServiceProblem());

        then(theServiceProblemPanel(), isDisplayed().with(theCorrectInformation())
                .and(aServiceProblemStatus(equalTo(Closed)))
                .and(theClosedDate()));
    }

    private Matcher<ServiceProblemPanel> theClosedDate() {
        return aClosedDate(theSameDateAs(serviceProblem.closedDate()));
    }

    private Matcher<ServiceProblemPanel> theFaultCauseAndResolutionReason() {
        ServiceProblemResolution resolution = serviceProblem.getResolution();
        return thatHas(aFault(withDescriptionOf(resolution.getFault())))
                .and(aCause(withDescriptionOf(resolution.getCause())))
                .and(aResolutionReason(withDescriptionOf(resolution.getResolutionReason())))
                ;
    }

    private Matcher<ServiceProblemPanel> theCorrectInformation() {
        return thatHas(aServiceProblemId(equalTo(serviceProblem.serviceProblemId())))
                .and(aServiceId(equalTo(serviceProblem.serviceId())))
                .and(aDirectoryNumber(equalTo(serviceProblem.getDirectoryNumber())))
                .and(aQueueName(equalTo(serviceProblem.queue().getName())))
                .and(aServiceType(equalTo(serviceProblem.getServiceType())))
                .and(anOpenedDate(theSameDateAs(serviceProblem.openedDate())))
                .and(aCustomerName(equalTo(serviceProblem.getEndUserInformation().getName())))
                .and(aContactNumber(equalTo(serviceProblem.getEndUserInformation().getPreferredContactNumber())))
                .and(anOperatorAccountNumber(equalTo(serviceProblem.getEndUserInformation().getOperatorAccountNumber())))
                .and(anOperatorReference(equalTo(serviceProblem.operatorReference())))
                .and(aProblem(equalTo(serviceProblem.problem().description())))
                ;
    }

    private AppendableAllOf<ServiceProblemPanel> isDisplayed() {
        return thatHas(IsDisplayed.<ServiceProblemPanel>isDisplayed()).and(aTitleOf("Service Problem"));
    }

    private StateExtractor<ServiceProblemPanel> theServiceProblemPanel() {
        return new StateExtractor<ServiceProblemPanel>() {
            @Override
            public ServiceProblemPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().serviceProblemPanel();
            }
        };
    }

    private ActionUnderTest theAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());
                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder anOpenServiceProblem() {
        serviceProblem = serviceProblemWithWorkItem().build();
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private GivensBuilder aClearedServiceProblem() {
        serviceProblem = serviceProblemBuilder().withStatus(Cleared).withResolution(someServiceProblemResolution()).build();
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private GivensBuilder aClosedServiceProblem() {
        serviceProblem = serviceProblemBuilder().withStatus(Closed).withClosedDate(someDateInTheNextYear().toDate()).build();
        return scenarioGivensBuilderFor(serviceProblem);
    }
}

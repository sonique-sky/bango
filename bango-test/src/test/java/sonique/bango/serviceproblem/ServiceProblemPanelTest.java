package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.ServiceProblemPanel;
import sonique.bango.matcher.DateMatcher;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.CoreMatchers.equalTo;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.DateMatcher.isSameDateToMinute;
import static sonique.bango.matcher.panel.ServiceProblemPanelMatchers.*;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemScenario;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class ServiceProblemPanelTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void displaysOpenServiceProblem() throws Exception {
        given(anOpenServiceProblem());

        when(theAgentViewsTheServiceProblem());

        then(theServiceProblemPanel(), isDisplayed().with(theCorrectInformation()));
    }

    private Matcher<ServiceProblemPanel> theCorrectInformation() {
        DomainServiceProblem serviceProblem = serviceProblemScenario.serviceProblem();

        return thatHas(aServiceProblemId(equalTo(serviceProblemScenario.serviceProblemId())))
                .and(aServiceId(equalTo(serviceProblem.serviceId())))
                .and(aServiceProblemStatus(equalTo(ServiceProblemStatus.Open)))
                .and(aDirectoryNumber(equalTo(serviceProblem.getDirectoryNumber())))
                .and(aQueueName(equalTo(serviceProblem.queue().getName())))
                .and(anOpenedDate(isSameDateToMinute(serviceProblem.openedDate())))
                ;
    }

    private AppendableAllOf<ServiceProblemPanel> isDisplayed() {
        return thatHas(IsDisplayed.<ServiceProblemPanel>isDisplayed()).and(aTitleOf("Service Problem"));
    }

    private StateExtractor<ServiceProblemPanel> theServiceProblemPanel() {
        return new StateExtractor<ServiceProblemPanel>() {
            @Override
            public ServiceProblemPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId()).tabContent().serviceProblemPanel();
            }
        };
    }

    private ActionUnderTest theAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblemScenario.serviceProblemId());
                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder anOpenServiceProblem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens gibbons) throws Exception {
                serviceProblemScenario = serviceProblemScenario(scenarioDriver(), agentForTest);
                serviceProblemScenario.bindScenario();

                return gibbons;
            }
        };
    }
}

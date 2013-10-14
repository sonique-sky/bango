package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class ServiceProblemTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void findsAndDisplaysServiceProblemWithoutWorkItem() throws Exception {
        given(aServiceProblemWithoutWorkItem());

        when(anAgentViewsTheServiceProblem());

        then(theServiceProblemTab(), isDisplayed().with(anEmptyWorkItemPanel()));
    }

    private Matcher<? super ServiceProblemTab> anEmptyWorkItemPanel() {
        return new TypeSafeMatcher<ServiceProblemTab>() {
            @Override
            protected boolean matchesSafely(ServiceProblemTab item) {
                return item.tabContent().workItemPanel().hasNoWorkItem();
            }

            @Override
            public void describeTo(Description description) {
                description.appendText("'No work item' text is displayed");
            }

            @Override
            protected void describeMismatchSafely(ServiceProblemTab item, Description mismatchDescription) {
                mismatchDescription.appendText("was not displayed :(");
            }
        };
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return thatHas(IsDisplayed.<ServiceProblemTab>isDisplayed());
    }

    private StateExtractor<ServiceProblemTab> theServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());
            }
        };
    }

    private GivensBuilder aServiceProblemWithoutWorkItem() {
        serviceProblemScenario = ServiceProblemScenario.noWorkItemScenario(scenarioDriver(), agentForTest);
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private ActionUnderTest anAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {

                supermanApp.appContainer().searchPanel().searchFor(serviceProblemScenario.serviceProblemId());

                return capturedInputAndOutputs;
            }
        };
    }
}
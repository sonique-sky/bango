package sonique.bango;

import com.google.common.collect.Lists;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Test;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.domain.Role;
import sonique.bango.driver.panel.LoginWindow;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.matcher.IsDisplayedMatcher;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.driver.panel.SearchFormPanel.SearchType.ServiceProblemId;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class SearchTest extends BaseBangoTest {

    @Test
    public void searchByServiceProblemId() throws Exception {
        given(anAgentHasLoggedIn());
        and(aServiceProblemExists());

        when(theAgentSearchesForTheServiceProblem());

        then(aServiceProblemTab(), isDisplayed());
    }

    private AppendableAllOf<SupermanElement> isDisplayed() {
        return thatHas(IsDisplayedMatcher.isDisplayed());
    }

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.serviceProblemTab(1);
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.searchPanel().searchUsing(ServiceProblemId, "1");

                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder aServiceProblemExists() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
                return interestingGivens;
            }
        };
    }

    private GivensBuilder anAgentHasLoggedIn() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
                Agent agent = new Agent("K.K", Lists.<Queue>newArrayList(), Role.ROLE_USER);

                register(agent);

                LoginWindow loginWindow = supermanApp.loginWindow();
                loginWindow.username().enter(agent.agentCode());
                loginWindow.password().enter(agent.password());

                loginWindow.loginButton().click();

                assertThat(supermanApp.headerPanel(), isDisplayed());

                return interestingGivens;
            }
        };
    }
}

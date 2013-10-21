package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.serviceproblem.EventHistoryToolbar;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.IsEnabled.isEnabled;
import static sonique.bango.matcher.panel.EventHistoryToolbarMatchers.*;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class EventHistoryToolbarTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();
        loginAgent();
    }

    @Test
    public void toolbarButtonsAreDisplayedAndEnabled() throws Exception {
        given(aServiceProblemIsDisplayed());
        and(theAgentIsViewingTheServiceProblem());

        then(theEventHistoryToolbar(), isShown()
                .and(theShowNoteOnlyButton(isDisplayed().and(isEnabled())))
                .and(theAddNoteButton(isDisplayed().and(isEnabled())))
                .and(theRefreshButton(isDisplayed().and(isEnabled())))
                .and(theFilterButton(isDisplayed().and(isEnabled())))
        );
    }

    private AppendableAllOf<EventHistoryToolbar> isShown() {
        return thatHas(IsDisplayed.<EventHistoryToolbar>isDisplayed());
    }

    private StateExtractor<EventHistoryToolbar> theEventHistoryToolbar() {
        return new StateExtractor<EventHistoryToolbar>() {
            @Override
            public EventHistoryToolbar execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel().eventHistoryToolbar();
            }
        };
    }

    private GivensBuilder aServiceProblemIsDisplayed() {
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private GivensBuilder theAgentIsViewingTheServiceProblem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());
                return givens;
            }
        };
    }
}

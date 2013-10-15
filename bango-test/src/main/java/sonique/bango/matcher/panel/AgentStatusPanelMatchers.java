package sonique.bango.matcher.panel;

import org.hamcrest.Matcher;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.panel.navigation.AgentStatusPanel;

public class AgentStatusPanelMatchers {

    public static Matcher<AgentStatusPanel> theAvailabilityButton(Matcher<SupermanButton> matcher) {
        return new AbstractPanelMatcher<AgentStatusPanel, SupermanButton>(matcher) {
            @Override
            protected SupermanButton actualValue(AgentStatusPanel item) {
                return item.availabilityButton();
            }
        };
    }
}
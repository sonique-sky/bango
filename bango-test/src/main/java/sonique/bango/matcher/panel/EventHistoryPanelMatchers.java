package sonique.bango.matcher.panel;

import org.hamcrest.Matcher;
import sky.sns.spm.domain.model.EventHistoryItem;
import sonique.bango.driver.panel.serviceproblem.EventHistoryPanel;

import java.util.List;

public class EventHistoryPanelMatchers {
    public static AbstractPanelMatcher<EventHistoryPanel, List<EventHistoryItem>> eventHistoryItems(Matcher<List<EventHistoryItem>> matcher) {
        return new AbstractPanelMatcher<EventHistoryPanel, List<EventHistoryItem>>(matcher) {
            @Override
            protected List<EventHistoryItem> actualValue(EventHistoryPanel item) {
                return item.historyItems();
            }
        };
    }
}

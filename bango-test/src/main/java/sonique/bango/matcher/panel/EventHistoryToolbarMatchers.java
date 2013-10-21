package sonique.bango.matcher.panel;

import org.hamcrest.Matcher;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.panel.serviceproblem.EventHistoryToolbar;

public class EventHistoryToolbarMatchers {

    public static Matcher<EventHistoryToolbar> theAddNoteButton(Matcher<? super  SupermanButton> matcher) {
        return new AbstractPanelMatcher<EventHistoryToolbar, SupermanButton>(matcher) {
            @Override
            protected SupermanButton actualValue(EventHistoryToolbar item) {
                return item.addNoteButton();
            }
        };
    }

    public static Matcher<EventHistoryToolbar> theRefreshButton(Matcher<? super SupermanButton> matcher) {
        return new AbstractPanelMatcher<EventHistoryToolbar, SupermanButton>(matcher) {
            @Override
            protected SupermanButton actualValue(EventHistoryToolbar item) {
                return item.refreshHistoryButton();
            }
        };
    }

    public static Matcher<EventHistoryToolbar> theFilterButton(Matcher<? super SupermanButton> matcher) {
        return new AbstractPanelMatcher<EventHistoryToolbar, SupermanButton>(matcher) {
            @Override
            protected SupermanButton actualValue(EventHistoryToolbar item) {
                return item.filterButton();
            }
        };
    }

    public static Matcher<EventHistoryToolbar> theShowNoteOnlyButton(Matcher<? super SupermanButton> matcher) {
        return new AbstractPanelMatcher<EventHistoryToolbar, SupermanButton>(matcher) {
            @Override
            protected SupermanButton actualValue(EventHistoryToolbar item) {
                return item.showNotesOnlyButton();
            }
        };
    }
}

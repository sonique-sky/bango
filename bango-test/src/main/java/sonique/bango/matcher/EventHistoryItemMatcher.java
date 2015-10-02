package sonique.bango.matcher;

import org.apache.commons.lang.StringUtils;
import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;
import sky.sns.spm.domain.model.EventHistoryItem;

import java.time.LocalDateTime;
import java.time.ZoneId;

import static sonique.bango.matcher.DateMatcher.theSameDateAs;

public class EventHistoryItemMatcher<T extends EventHistoryItem> extends TypeSafeMatcher<T> {
    private final EventHistoryItem expected;

    public EventHistoryItemMatcher(EventHistoryItem expected) {
        this.expected = expected;
    }

    @Override
    protected boolean matchesSafely(EventHistoryItem actual) {
        return (StringUtils.equals(expected.createdBy(), actual.createdBy()) &&
                StringUtils.equals(expected.note(), actual.note()) &&
                expected.type().equals(actual.type()) &&
                theSameDateAs(expected.createdDate()).matches(LocalDateTime.ofInstant(actual.createdDate().toInstant(), ZoneId.systemDefault())));
    }

    @Override
    public void describeTo(Description description) {
        description.appendText(" expected " + expected.toString());
    }
}

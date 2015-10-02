package sonique.bango.matcher;

import org.apache.commons.lang.StringUtils;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import static sonique.bango.matcher.DateMatcher.theSameDateAs;

public class EventHistoryMatcher extends TypeSafeMatcher<List<EventHistoryItem>> {

    public static EventHistoryMatcher eventHistoryMatches(List<? extends EventHistoryItem> expectedDomainEvents) {
        return new EventHistoryMatcher(expectedDomainEvents);
    }

    private final List<? extends EventHistoryItem> expectedDomainEvents;

    private EventHistoryMatcher(List<? extends EventHistoryItem> expectedDomainEvents) {
        this.expectedDomainEvents = expectedDomainEvents;
    }

    @Override
    protected boolean matchesSafely(List<EventHistoryItem> actualDtoEvents) {
        if (!sameSizeOrBothNull(actualDtoEvents, expectedDomainEvents)) {
            return false;
        }

        int index = 0;
        for (EventHistoryItem dtoEvent : actualDtoEvents) {
            EventHistoryItem domainEvent = expectedDomainEvents.get(index++);

            if (!eventsMatch(dtoEvent, domainEvent)) {
                System.out.println("domainEvent = " + domainEvent);
                System.out.println("dtoEvent = " + dtoEvent);
                return false;
            }
        }
        return true;
    }

    @Override
    public void describeTo(Description description) {
        for (EventHistoryItem domainEvent : expectedDomainEvents) {
            description.appendText(
                    describe(
                            domainEvent.createdBy(),
                            domainEvent.note(),
                            domainEvent.type(),
                            domainEvent.createdDate()
                    )
            );
        }
    }

    @Override
    protected void describeMismatchSafely(List<EventHistoryItem> actualEventHistoryItems, Description mismatchDescription) {
        for (EventHistoryItem dtoEvent : actualEventHistoryItems) {
            mismatchDescription.appendText(
                    describe(
                            dtoEvent.createdBy(),
                            dtoEvent.note(),
                            dtoEvent.type(),
                            dtoEvent.createdDate())
            );
        }
    }

    private String describe(String createdBy, String note, EventDescription type, Date createdDate) {
        final StringBuilder sb = new StringBuilder();
        sb.append("EventHistory");
        sb.append("{note='").append(note).append('\'');
        sb.append(", createdDate=").append(createdDate);
        sb.append(", createdBy='").append(createdBy).append('\'');
        sb.append(", type='").append(type).append('\'');
        sb.append("}\n");
        return sb.toString();
    }

    private boolean eventsMatch(EventHistoryItem thisEventHistoryItem, EventHistoryItem thatEventHistoryItem) {
        return new EventHistoryItemMatcher(thisEventHistoryItem).matches(thatEventHistoryItem);
    }

    private boolean sameSizeOrBothNull(List<?> list1, List<?> list2) {
        if (list1 == null) {
            return list2 == null;
        } else {
            return list2 != null && list1.size() == list2.size();
        }
    }
}
package sonique.bango.util;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemEventHistoryItem;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static sonique.datafixtures.DateTimeDataFixtures.someDateInTheNextYear;
import static sonique.datafixtures.PrimitiveDataFixtures.someNumberBetween;
import static util.SupermanDataFixtures.*;

public class BangoDataFixtures {

    public static List<EventHistoryItem> someEventHistoryItemsFor(DomainServiceProblem serviceProblem) {
        List<EventHistoryItem> list = newArrayList();
        for (int i = 0; i < someNumberBetween(3, 7); i++) {
            list.add(ServiceProblemEventHistoryItem.createEvent(someEventDescription(), someDateInTheNextYear().toDate(), someAgent().getActorName(), someNoteText(), serviceProblem));
        }
        return list;
    }

    public static List<EventHistoryItem> someEventHistoryItemsFor(DomainServiceProblem serviceProblem, EventDescription wantedEvent) {
        List<EventHistoryItem> list = newArrayList();
        for (int i = 0; i < someNumberBetween(6, 10); i++) {
            EventDescription description = i % 2 == 0 ? someEventDescription() : wantedEvent;
            list.add(ServiceProblemEventHistoryItem.createEvent(description, someDateInTheNextYear().toDate(), someAgent().getActorName(), someNoteText(), serviceProblem));
        }
        return list;
    }
}

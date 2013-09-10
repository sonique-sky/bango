package sonique.bango.controller;

import com.google.common.collect.Iterables;
import com.google.common.collect.Ordering;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sonique.bango.domain.EventHistoryItem;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.ServiceProblemStore;

import java.util.*;

import static sonique.bango.controller.ServiceProblemApiController.EventHistoryByDate.byDate;

@Controller
public class ServiceProblemApiController {

    private final ServiceProblemStore serviceProblemStore;

    public ServiceProblemApiController(ServiceProblemStore serviceProblemStore) {
        this.serviceProblemStore = serviceProblemStore;
    }

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public Collection<ServiceProblem> serviceProblem(@PathVariable int serviceProblemId) {
        return serviceProblemStore.serviceProblemById(serviceProblemId);
    }

    @RequestMapping(value = "/{serviceProblemId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public Collection<EventHistoryItem> eventHistory(@PathVariable int serviceProblemId) {
        List<EventHistoryItem> historyItems = serviceProblemWithId(serviceProblemId).eventHistoryItems();
        return Ordering.from(byDate()).sortedCopy(historyItems);
    }

    @RequestMapping(consumes = "application/json", value = "/{serviceProblemId}/eventHistory", method = RequestMethod.POST)
    @ResponseBody
    public Collection<EventHistoryItem> addEventHistory(@PathVariable int serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        ServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        List<EventHistoryItem> historyItems = serviceProblem.eventHistoryItems();
        historyItems.add(new EventHistoryItem("Note", payloadMap.get("noteText"), new Date(), "Me"));

        return Ordering.from(byDate()).sortedCopy(historyItems);
    }

    private ServiceProblem serviceProblemWithId(int serviceProblemId) {
        return Iterables.getFirst(serviceProblemStore.serviceProblemById(serviceProblemId), null);
    }

    public static class EventHistoryByDate implements Comparator<EventHistoryItem> {
        public static EventHistoryByDate byDate() {
            return new EventHistoryByDate();
        }

        public int compare(EventHistoryItem o, EventHistoryItem o2) {
            return o2.createdDate().compareTo(o.createdDate());
        }

    }
}

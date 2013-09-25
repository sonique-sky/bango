package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sonique.bango.domain.EventHistoryItem;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.service.MyServiceProblemApiService;
import sonique.bango.service.ServiceProblemApiService;

import java.util.Collection;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;

@Controller
public class ServiceProblemApiController {

    private final ServiceProblemApiService serviceProblemApiService;

    public ServiceProblemApiController(ServiceProblemApiService serviceProblemApiService) {
        this.serviceProblemApiService = serviceProblemApiService;
    }

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public Collection<ServiceProblem> serviceProblem(@PathVariable int serviceProblemId) {
        return serviceProblemApiService.serviceProblemsById(serviceProblemId);
    }

    @RequestMapping(value = "/{serviceProblemId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public Collection<EventHistoryItem> eventHistory(@PathVariable int serviceProblemId) {
        return serviceProblemApiService.serviceProblemWithId(serviceProblemId).eventHistoryItems();
    }

    @RequestMapping(consumes = "application/json", value = "/{serviceProblemId}/eventHistory", method = RequestMethod.POST)
    @ResponseBody
    public Collection<EventHistoryItem> addEventHistory(@PathVariable int serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return serviceProblemApiService.addNote(serviceProblemId, payloadMap.get("note"));
    }

    @RequestMapping(value = "/{serviceProblemId}/pull", method = RequestMethod.POST)
    @ResponseBody
    public Collection<ServiceProblem> pull(@PathVariable int serviceProblemId) {
        return serviceProblemApiService.pull(serviceProblemId);
    }

    @RequestMapping(value = "/{serviceProblemId}/hold", method = RequestMethod.POST)
    @ResponseBody
    public Collection<ServiceProblem> hold(@PathVariable int serviceProblemId) {
        return serviceProblemApiService.hold(serviceProblemId);
    }

    @RequestMapping(value = "/{serviceProblemId}/unhold", method = RequestMethod.POST)
    @ResponseBody
    public Collection<ServiceProblem> release(@PathVariable int serviceProblemId) {
        return serviceProblemApiService.release(serviceProblemId);
    }
}

package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.ServiceProblemId;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Controller
public class ServiceProblemApiController {

    private final ServiceProblemApiService serviceProblemApiService;

    public ServiceProblemApiController(ServiceProblemApiService serviceProblemApiService) {
        this.serviceProblemApiService = serviceProblemApiService;
    }

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public Collection<DomainServiceProblem> serviceProblem(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.serviceProblemsById(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public List<EventHistoryItem> eventHistory(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.serviceProblemWithId(new ServiceProblemId(serviceProblemId)).historyItems();
    }

    @RequestMapping(consumes = "application/json", value = "/{serviceProblemId}/eventHistory", method = RequestMethod.POST)
    @ResponseBody
    public Collection<EventHistoryItem> addEventHistory(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return serviceProblemApiService.addNote(new ServiceProblemId(serviceProblemId), payloadMap.get("note"));
    }

    @RequestMapping(value = "/{serviceProblemId}/pull", method = RequestMethod.POST)
    @ResponseBody
    public Collection<DomainServiceProblem> pull(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.pull(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/hold", method = RequestMethod.POST)
    @ResponseBody
    public Collection<DomainServiceProblem> hold(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.hold(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/unhold", method = RequestMethod.POST)
    @ResponseBody
    public Collection<DomainServiceProblem> release(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.release(new ServiceProblemId(serviceProblemId));
    }
}

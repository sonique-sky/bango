package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.ServiceProblemId;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/serviceProblem")
public class ServiceProblemApiController {

    @Resource
    private ServiceProblemApiService serviceProblemApiService;

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public DomainServiceProblem serviceProblem(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.serviceProblemWithId(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public List<EventHistoryItem> eventHistory(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.eventHistory(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(consumes = "application/json", value = "/{serviceProblemId}/eventHistory", method = RequestMethod.POST)
    @ResponseBody
    public Collection<EventHistoryItem> addEventHistory(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return serviceProblemApiService.addNote(new ServiceProblemId(serviceProblemId), payloadMap.get("note"));
    }

    @RequestMapping(value = "/{serviceProblemId}/pull", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem pull(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.pull(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/workReminder", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem createWorkReminder(@PathVariable Long serviceProblemId, @RequestBody Date date) {
        return serviceProblemApiService.createWorkReminder(
                new ServiceProblemId(serviceProblemId),
                date
        );
    }

    @RequestMapping(value = "/{serviceProblemId}/hold", method = RequestMethod.PUT)
    @ResponseBody
    public DomainServiceProblem hold(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.hold(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/unhold", method = RequestMethod.PUT)
    @ResponseBody
    public DomainServiceProblem release(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.release(new ServiceProblemId(serviceProblemId));
    }
}

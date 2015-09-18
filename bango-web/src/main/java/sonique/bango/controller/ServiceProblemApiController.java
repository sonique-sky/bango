package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.TransferType;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.RequestParameters;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.QueueId;
import spm.domain.ServiceProblemId;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/api/serviceProblem")
public class ServiceProblemApiController {

    @Resource
    private ServiceProblemApiService serviceProblemApiService;

    @RequestMapping(method = RequestMethod.GET)
    public PagedSearchResults<DomainServiceProblem> serviceProblems(@ModelAttribute RequestParameters requestParameters) {
        return serviceProblemApiService.serviceProblems(requestParameters);
    }

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
    public EventHistoryItem addEventHistory(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return serviceProblemApiService.addNote(new ServiceProblemId(serviceProblemId), payloadMap.get("note"));
    }

    @RequestMapping(value = "/{serviceProblemId}/pull", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem pull(@PathVariable Long serviceProblemId) {
        return serviceProblemApiService.pull(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(value = "/{serviceProblemId}/workReminder", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem createWorkReminder(@PathVariable Long serviceProblemId, @RequestBody LocalDateTime localDateTime) {
        Date date = Date.from(localDateTime.toInstant(ZoneOffset.UTC));
        return serviceProblemApiService.createWorkReminder(
                new ServiceProblemId(serviceProblemId),
                date
        );
    }

    @RequestMapping(value = "/{serviceProblemId}/transfer", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem transferServiceProblem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        QueueId queueId = new QueueId(payloadMap.get("queueId"));
        TransferType transferType = asList(TransferType.values()).stream().filter(tType -> tType.getDescription().equals(payloadMap.get("transferType"))).findFirst().get();

        return serviceProblemApiService.transferToQueue(
                new ServiceProblemId(serviceProblemId),
                transferType,
                queueId
        );
    }

    @RequestMapping(value = "/{serviceProblemId}/reassign", method = RequestMethod.PUT)
    @ResponseBody
    public DomainServiceProblem reassignServiceProblem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        String agentCode = payloadMap.get("agentCode");

        return serviceProblemApiService.reassignToAgent(
                new ServiceProblemId(serviceProblemId),
                agentCode
        );
    }

    @RequestMapping(value = "/{serviceProblemId}/clear", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem clearServiceProblem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return serviceProblemApiService.clearServiceProblem(
                new ServiceProblemId(serviceProblemId),
                payloadMap.get("fault"),
                payloadMap.get("cause"),
                payloadMap.get("resolution")
        );
    }

    @RequestMapping(value = "/{serviceProblemId}/nextWorkItem", method = RequestMethod.POST)
    @ResponseBody
    public DomainServiceProblem selectNextWorkItem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return serviceProblemApiService.selectNextWorkItem(
                new ServiceProblemId(serviceProblemId),
                payloadMap.get("nextWorkItem")
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

    @RequestMapping(value = "/workItemActions", method = RequestMethod.GET)
    @ResponseBody
    public Collection<WorkItemAction> worksItemActions() {
        return asList(WorkItemAction.values());
    }

}

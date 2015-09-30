package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.TransferType;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.MajorServiceProblemId;
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
    public PagedSearchResults<DomainServiceProblem> serviceProblems(@ModelAttribute SearchParametersDTO searchParameters) {
        return serviceProblemApiService.serviceProblems(searchParameters);
    }

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData<DomainServiceProblem> serviceProblem(@PathVariable Long serviceProblemId) {
        return new ResponseData<>(serviceProblemApiService.serviceProblemWithId(new ServiceProblemId(serviceProblemId)));
    }

    @RequestMapping(value = "/{serviceProblemId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData<List<EventHistoryItem>> eventHistory(@PathVariable Long serviceProblemId) {
        return new ResponseData<>(serviceProblemApiService.eventHistory(new ServiceProblemId(serviceProblemId)));
    }

    @RequestMapping(consumes = "application/json", value = "/{serviceProblemId}/eventHistory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<EventHistoryItem> addEventHistory(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return new ResponseData<>(serviceProblemApiService.addNote(new ServiceProblemId(serviceProblemId), payloadMap.get("note")));
    }

    @RequestMapping(value = "/{serviceProblemId}/pull", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<DomainServiceProblem> pull(@PathVariable Long serviceProblemId) {
        return new ResponseData<>(serviceProblemApiService.pull(new ServiceProblemId(serviceProblemId)));
    }

    @RequestMapping(value = "/{serviceProblemId}/workReminder", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<DomainServiceProblem> createWorkReminder(@PathVariable Long serviceProblemId, @RequestBody LocalDateTime localDateTime) {
        Date date = Date.from(localDateTime.toInstant(ZoneOffset.UTC));
        return new ResponseData<>(serviceProblemApiService.createWorkReminder(
                new ServiceProblemId(serviceProblemId),
                date
        ));
    }

    @RequestMapping(value = "/{serviceProblemId}/transfer", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<DomainServiceProblem> transferServiceProblem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        QueueId queueId = new QueueId(payloadMap.get("queueId"));
        TransferType transferType = asList(TransferType.values()).stream().filter(tType -> tType.getDescription().equals(payloadMap.get("transferType"))).findFirst().get();

        return new ResponseData<>(serviceProblemApiService.transferToQueue(
                new ServiceProblemId(serviceProblemId),
                transferType,
                queueId
        ));
    }

    @RequestMapping(value = "/{serviceProblemId}/reassign", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData<DomainServiceProblem> reassignServiceProblem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        String agentCode = payloadMap.get("agentCode");

        return new ResponseData<>(serviceProblemApiService.reassignToAgent(
                new ServiceProblemId(serviceProblemId),
                agentCode
        ));
    }

    @RequestMapping(value = "/{serviceProblemId}/clear", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<DomainServiceProblem> clearServiceProblem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return new ResponseData<>(serviceProblemApiService.clearServiceProblem(
                new ServiceProblemId(serviceProblemId),
                payloadMap.get("fault"),
                payloadMap.get("cause"),
                payloadMap.get("resolution")
        ));
    }

    @RequestMapping(value = "/{serviceProblemId}/nextWorkItem", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<DomainServiceProblem> selectNextWorkItem(@PathVariable Long serviceProblemId, @RequestBody Map<String, String> payloadMap) {
        return new ResponseData<>(serviceProblemApiService.selectNextWorkItem(
                new ServiceProblemId(serviceProblemId),
                payloadMap.get("nextWorkItem")
        ));
    }

    @RequestMapping(value = "/{serviceProblemId}/hold", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData<DomainServiceProblem> hold(@PathVariable Long serviceProblemId) {
        return new ResponseData<>(serviceProblemApiService.hold(new ServiceProblemId(serviceProblemId)));
    }

    @RequestMapping(value = "/{serviceProblemId}/unhold", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData<DomainServiceProblem> release(@PathVariable Long serviceProblemId) {
        return new ResponseData<>(serviceProblemApiService.release(new ServiceProblemId(serviceProblemId)));
    }

    @RequestMapping(value = "/workItemActions", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData<Collection<WorkItemAction>> worksItemActions() {
        return new ResponseData<>(asList(WorkItemAction.values()));
    }

    @RequestMapping(value = "/{serviceProblemId}/associate/msp/{majorServiceProblemId}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData<DomainServiceProblem> associateServiceProblemToMsp(@PathVariable Long serviceProblemId, @PathVariable Long majorServiceProblemId) {
        return new ResponseData<>(
                serviceProblemApiService.associateServiceProblemToMajorServiceProblem(
                        new ServiceProblemId(serviceProblemId),
                        new MajorServiceProblemId(majorServiceProblemId)
                )
        );
    }

}

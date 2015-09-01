package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.service.QueueApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/queue")
public class QueueApiController {

    @Resource
    private QueueApiService queueApiService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public PagedSearchResults<Queue> queue(@RequestParam Integer page, @RequestParam Integer start, @RequestParam Integer limit) {
        return queueApiService.allQueues(start, limit);
    }

    @RequestMapping(value = "/{queueId}/serviceProblems", method = RequestMethod.GET)
    public PagedSearchResults<DomainServiceProblem> serviceProblems(@PathVariable int queueId, @RequestParam Integer page, @RequestParam Integer start, @RequestParam Integer limit) {
        return queueApiService.serviceProblemsFor(queueId, page, start, limit);
    }

    @RequestMapping(value = "/bulkTransfer", method = RequestMethod.POST, consumes = "application/json")
    public PagedSearchResults<DomainServiceProblem> bulkTransfer(@RequestBody BulkTransferRequest request) {
        return queueApiService.bulkTransfer(request);
    }

    @RequestMapping(value = "/bulkClear", method = RequestMethod.POST, consumes = "application/json")
    public PagedSearchResults<DomainServiceProblem> bulkClear(@RequestBody BulkClearRequest request) {
        return queueApiService.bulkClear(request);
    }
}

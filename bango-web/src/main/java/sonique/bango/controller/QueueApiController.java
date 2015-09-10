package sonique.bango.controller;

import com.google.common.collect.Lists;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.ResponseData;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.domain.sorter.Sort;
import sonique.bango.service.QueueApiService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/api/queue")
public class QueueApiController {

    @Resource
    private QueueApiService queueApiService;

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Queue> allQueues() { //TODO : everything returns PagedSearchResults or ResponseData
        ArrayList<Sort> sorts = Lists.newArrayList(new Sort("name", Sort.Direction.Ascending));
        return queueApiService.allQueues(0, Integer.MAX_VALUE, sorts).getData();
    }

    @RequestMapping(method = RequestMethod.GET, params = {"start", "limit", "sort"})
    public PagedSearchResults<Queue> sortedPagedQueues(@RequestParam Integer start, @RequestParam Integer limit, @RequestParam Sort[] sort) {
        return queueApiService.allQueues(start, limit, asList(sort));
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<Queue> createQueue(@RequestBody Queue queue) {
        return new ResponseData<>(queueApiService.createQueue(queue));
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<Queue> updateQueue(@RequestBody Queue queue) {
        return new ResponseData<>(queueApiService.updateQueue(queue));
    }

    @RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<Queue> deleteQueue(@RequestBody Queue queue) {
        return new ResponseData<>(queueApiService.deleteQueue(queue));
    }

    @RequestMapping(value = "/{queueId}/serviceProblems", method = RequestMethod.GET)
    public PagedSearchResults<DomainServiceProblem> serviceProblems(@PathVariable int queueId, @RequestParam Integer page, @RequestParam Integer start, @RequestParam Integer limit) {
        return queueApiService.serviceProblemsFor(queueId, page, start, limit);
    }

    @RequestMapping(value = "/bulkTransfer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public PagedSearchResults<DomainServiceProblem> bulkTransfer(@RequestBody BulkTransferRequest request) {
        return queueApiService.bulkTransfer(request);
    }

    @RequestMapping(value = "/bulkClear", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public PagedSearchResults<DomainServiceProblem> bulkClear(@RequestBody BulkClearRequest request) {
        return queueApiService.bulkClear(request);
    }

}

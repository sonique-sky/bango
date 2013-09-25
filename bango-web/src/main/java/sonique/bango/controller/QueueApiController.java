package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.service.QueueApiService;

import java.util.Collection;

@Controller
public class QueueApiController {

    private final QueueApiService queueApiService;

    public QueueApiController(QueueApiService queueApiService) {
        this.queueApiService = queueApiService;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Queue> queue() {
        return queueApiService.allQueues();
    }

    @RequestMapping(value = "/{queueId}/serviceProblems", method = RequestMethod.GET)
    @ResponseBody
    public Collection<ServiceProblem> serviceProblems(@PathVariable int queueId) {
        return queueApiService.serviceProblemsFor(queueId);
    }

    @RequestMapping(value = "/bulkTransfer", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Collection<ServiceProblem> bulkTransfer(@RequestBody BulkTransferRequest request) {
        return queueApiService.bulkTransfer(request);
    }

    @RequestMapping(value = "/bulkClear", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Collection<ServiceProblem> bulkClear(@RequestBody BulkClearRequest request) {
        return queueApiService.bulkClear(request);
    }
}
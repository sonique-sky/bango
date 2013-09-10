package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.util.Collection;

@Controller
public class QueueApiController {

    private final QueueStore queueStore;
    private final ServiceProblemStore serviceProblemStore;

    public QueueApiController(QueueStore queueStore, ServiceProblemStore serviceProblemStore) {
        this.queueStore = queueStore;
        this.serviceProblemStore = serviceProblemStore;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Queue> queue() {
        return queueStore.allQueues();
    }

    @RequestMapping(value = "/{queueId}", method = RequestMethod.GET)
    @ResponseBody
    public Queue queue(@PathVariable int queueId) {
        return queueStore.queueById(queueId);
    }

    @RequestMapping(value = "/{queueId}/serviceProblems", method = RequestMethod.GET)
    @ResponseBody
    public Collection<ServiceProblem> serviceProblems(@PathVariable int queueId) {
        return serviceProblemStore.serviceProblemsForQueueId(queueId);
    }

    @RequestMapping(value = "/bulk-transfer", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Collection<ServiceProblem> bulkTransfer(@RequestBody BulkTransferRequest request) {
        serviceProblemStore.bulkTransfer(request.serviceProblemIds(), queueStore.queueById(request.destinationQueueId()));
        return serviceProblemStore.serviceProblemsForQueueId(request.originalQueueId());
    }

    @RequestMapping(value = "/bulk-clear", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Collection<ServiceProblem> bulkClear(@RequestBody BulkClearRequest request) {
        serviceProblemStore.bulkClear(request.serviceProblemIds());
        return serviceProblemStore.serviceProblemsForQueueId(request.originalQueueId());
    }
}
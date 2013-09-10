package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.util.Collection;
import java.util.List;

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
    public List<ServiceProblem> serviceProblems(@PathVariable int queueId) {
        return serviceProblemStore.serviceProblemsForQueueId(queueId);
    }
}
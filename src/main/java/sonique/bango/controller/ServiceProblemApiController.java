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

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;

@Controller
public class ServiceProblemApiController {

    private final ServiceProblemStore serviceProblemStore;

    public ServiceProblemApiController(ServiceProblemStore serviceProblemStore) {
        this.serviceProblemStore = serviceProblemStore;
    }

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public Collection<ServiceProblem> queue(@PathVariable int serviceProblemId) {
        return serviceProblemStore.serviceProblemById(serviceProblemId);
    }
}

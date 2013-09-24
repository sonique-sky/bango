package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sonique.bango.domain.Agent;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import java.util.Collection;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

@Controller
public class SearchApiController {

    private final ServiceProblemStore serviceProblemStore;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    public SearchApiController(ServiceProblemStore serviceProblemStore, SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.serviceProblemStore = serviceProblemStore;
        this.authorisedActorProvider = authorisedActorProvider;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceProblemId/{serviceProblemId}")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsById(@PathVariable int serviceProblemId) {
        return serviceProblemStore.serviceProblemById(serviceProblemId);
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/directoryNumber/{directoryNumber}")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsByDirectoryNumber(@PathVariable String directoryNumber) {
        return serviceProblemStore.serviceProblemByDirectoryNumber(directoryNumber);
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceId/{serviceId}")
    @ResponseBody
    public List<ServiceProblem> serviceProblemsByServiceId(@PathVariable String serviceId) {
        return newArrayList();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/mspId/{mspId}")
    @ResponseBody
    public List<ServiceProblem> serviceProblemsByMspId(@PathVariable String mspId) {
        return newArrayList();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/myItems")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsForAuthenticatedAgent() {
        return serviceProblemStore.serviceProblemsForAgent(authorisedActorProvider.getLoggedInAgent());
    }

}

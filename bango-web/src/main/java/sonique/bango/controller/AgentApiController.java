package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sonique.bango.domain.Agent;
import sonique.bango.domain.AgentState;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.service.AgentApiService;
import sonique.bango.service.MyAgentApiService;

import java.util.Collection;

@Controller
public class AgentApiController {

    private final AgentApiService agentApiService;

    public AgentApiController(AgentApiService agentApiService) {
        this.agentApiService = agentApiService;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/authenticatedAgent")
    @ResponseBody
    public Agent authenticatedAgent() {
        return agentApiService.authenticatedAgent();
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/toggleAvailability")
    @ResponseBody
    public AgentState toggleAvailability() {
        return agentApiService.toggleAvailability();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/agentState")
    @ResponseBody
    public AgentState agentState() {
        return this.authenticatedAgent().agentState();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/myItems")
    @ResponseBody
    public Collection<ServiceProblem> myItems() {
        return agentApiService.myItems();
    }

}
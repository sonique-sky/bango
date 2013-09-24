package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sonique.bango.domain.Agent;
import sonique.bango.domain.AgentState;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

@Controller
public class AgentApiController {

    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    public AgentApiController(SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.authorisedActorProvider = authorisedActorProvider;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/authenticatedAgent")
    @ResponseBody
    public Agent authenticatedAgent() {
        return authorisedActorProvider.authenticatedAgent();
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/toggleAvailability")
    @ResponseBody
    public AgentState toggleAvailability() {
        AgentState agentState = this.authenticatedAgent().agentState();
        agentState.toggleAvailability();

        return agentState;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/agentState")
    @ResponseBody
    public AgentState agentState() {
        return this.authenticatedAgent().agentState();
    }
}

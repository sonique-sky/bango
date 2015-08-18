package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sonique.bango.service.AgentApiService;

import javax.annotation.Resource;
import java.util.Collection;

@Controller
@RequestMapping("/api/agent")
public class AgentApiController {

    @Resource
    private AgentApiService agentApiService;

    @RequestMapping(method = {RequestMethod.GET}, value = "/authenticatedAgent")
    @ResponseBody
    public DomainAgent authenticatedAgent() {
        return agentApiService.authenticatedAgent();
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/toggleAvailability")
    @ResponseBody
    public AgentStateDTO toggleAvailability() {
        return agentApiService.toggleAvailability();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/agentState")
    @ResponseBody
    public AgentStateDTO agentState() {
        return agentApiService.agentState();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/myItems")
    @ResponseBody
    public Collection<DomainServiceProblem> myItems() {
        return agentApiService.myItems();
    }

}
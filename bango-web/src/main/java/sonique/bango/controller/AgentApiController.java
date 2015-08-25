package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.AgentApiService;

import javax.annotation.Resource;

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
    public PagedSearchResults<DomainServiceProblem> myItems(@RequestParam Integer start, @RequestParam Integer limit) {
        return agentApiService.myItems(SearchParametersDTO.withNoSearchProperties(limit, start));
    }
}
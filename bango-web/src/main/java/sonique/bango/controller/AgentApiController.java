package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.AgentApiService;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/api/agent")
public class AgentApiController {

    @Resource
    private AgentApiService agentApiService;


    @RequestMapping(method = {RequestMethod.GET})
    public PagedSearchResults<DomainAgent> allAgents(RequestParameters requestParameters) {
        return agentApiService.allAgents(requestParameters);
    }

    @RequestMapping(method = {RequestMethod.POST}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public DomainAgent create(@RequestBody DomainAgent agent) {
        return agentApiService.createAgent(agent);
    }

    @RequestMapping(method = {RequestMethod.PUT}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public DomainAgent update(@RequestBody DomainAgent agent) {
        return agentApiService.updateAgent(agent);
    }

    @RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<DomainAgent> deleteAgent(@RequestBody DomainAgent agent) {
        return new ResponseData<>(agentApiService.deleteAgent(agent));
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/authenticatedAgent")
    public DomainAgent authenticatedAgent() {
        return agentApiService.authenticatedAgent();
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/toggleAvailability")
    public AgentStateDTO toggleAvailability() {
        return agentApiService.toggleAvailability();
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/reassign")
    public DomainAgent reassignAgent(@RequestBody Map<String, String> payloadMap) {
        String agentCode = payloadMap.get("agent");
        String currentTeam = payloadMap.get("currentTeam");
        String newTeam = payloadMap.get("newTeam");
        return agentApiService.reassignAgent(agentCode, currentTeam, newTeam);
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/agentState")
    public AgentStateDTO agentState() {
        return agentApiService.agentState();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/myItems")
    public PagedSearchResults<DomainServiceProblem> myItems(@RequestParam Integer start, @RequestParam Integer limit) {
        return agentApiService.myItems(SearchParametersDTO.withNoSearchProperties(limit, start));
    }

}
package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.DomainAgent;
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
    public PagedSearchResults<DomainAgent> allAgents(@ModelAttribute SearchParametersDTO searchParameters) {
        return agentApiService.readAgents(searchParameters);
    }

    @RequestMapping(method = {RequestMethod.POST}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<DomainAgent> create(@RequestBody DomainAgent agent) {
        return new ResponseData<>(agentApiService.createAgent(agent));
    }

    @RequestMapping(method = {RequestMethod.PUT}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<DomainAgent> update(@RequestBody DomainAgent agent) {
        return new ResponseData<>(agentApiService.updateAgent(agent));
    }

    @RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<DomainAgent> deleteAgent(@RequestBody DomainAgent agent) {
        return new ResponseData<>(agentApiService.deleteAgent(agent));
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/authenticatedAgent")
    public ResponseData<DomainAgent> authenticatedAgent() {
        return new ResponseData<>(agentApiService.authenticatedAgent());
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/toggleAvailability")
    public ResponseData<AgentStateDTO> toggleAvailability() {
        return new ResponseData<>(agentApiService.toggleAvailability());
    }

    @RequestMapping(method = {RequestMethod.POST}, value = "/reassign")
    public ResponseData<DomainAgent> reassignAgent(@RequestBody Map<String, String> payloadMap) {
        String agentCode = payloadMap.get("agent");
        String currentTeam = payloadMap.get("currentTeam");
        String newTeam = payloadMap.get("newTeam");
        return new ResponseData<>(agentApiService.reassignAgent(agentCode, currentTeam, newTeam));
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/agentState")
    public ResponseData<AgentStateDTO> agentState() {
        return new ResponseData<>(agentApiService.agentState());
    }
}
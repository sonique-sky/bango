package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.TeamApiService;

import javax.annotation.Resource;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/team")
public class TeamApiController {

    @Resource
    private TeamApiService teamApiService;

    @RequestMapping(method = {RequestMethod.GET})
    public PagedSearchResults<DomainTeam> readTeams(@ModelAttribute SearchParametersDTO searchParameters) {
        return teamApiService.readTeams(searchParameters);
    }

    @RequestMapping(method = {RequestMethod.POST}, consumes = {APPLICATION_JSON_VALUE})
    public ResponseData<DomainTeam> createTeam(@RequestBody DomainTeam team) {
        return new ResponseData<>(teamApiService.createTeam(team));
    }

    @RequestMapping(method = {RequestMethod.PUT}, consumes = {APPLICATION_JSON_VALUE})
    public ResponseData<DomainTeam> updateTeam(@RequestBody DomainTeam team) {
        return new ResponseData<>(teamApiService.updateTeam(team));
    }

    @RequestMapping(method = {RequestMethod.DELETE}, consumes = {APPLICATION_JSON_VALUE})
    public ResponseData<DomainTeam> deleteTeam(@RequestBody DomainTeam team) {
        return new ResponseData<>(teamApiService.deleteTeam(team));
    }
}

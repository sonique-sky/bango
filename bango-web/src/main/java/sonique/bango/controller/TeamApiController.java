package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.DomainTeam;
import sonique.bango.service.TeamApiService;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamApiController {

    @Resource
    private TeamApiService teamApiService;

    @RequestMapping(method = {RequestMethod.GET})
    public List<DomainTeam> teams() {
        return teamApiService.teams();
    }

    @RequestMapping(method = {RequestMethod.POST}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public DomainTeam addTeam(@RequestBody DomainTeam team) {
        return teamApiService.addTeam(team);
    }

}

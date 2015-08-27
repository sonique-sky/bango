package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.refdata.Queue;
import sonique.bango.service.QueueApiService;
import sonique.bango.service.TeamApiService;
import spm.domain.TeamId;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/team")
public class TeamApiController {

    @Resource
    private TeamApiService teamApiService;

    @Resource
    private QueueApiService queueApiService;

    @RequestMapping(method = {RequestMethod.GET})
    public List<DomainTeam> allTeams() {
        return teamApiService.teams();
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/{teamId}/unassignedQueues")
    public List<Queue> unassignedQueues(@PathVariable Long teamId) {
        DomainTeam team = teamApiService.getTeam(new TeamId(teamId));
        Collection<Queue> queues = queueApiService.allQueues();

        return queues.stream().filter(((Predicate<Queue>) q -> team.assignedQueues().contains(q)).negate()).collect(toList());
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/{teamId}/assignedQueues")
    public List<Queue> assignedQueues(@PathVariable Long teamId) {
        return teamApiService.getTeam(new TeamId(teamId)).assignedQueues();
    }

    @RequestMapping(method = {RequestMethod.POST}, consumes = {APPLICATION_JSON_VALUE})
    public DomainTeam addTeam(@RequestBody DomainTeam team) {
        return teamApiService.addTeam(team);
    }

    @RequestMapping(method = {RequestMethod.PUT}, consumes = {APPLICATION_JSON_VALUE})
    public DomainTeam updateTeam(@RequestBody DomainTeam team) {
        return teamApiService.updateTeam(team);
    }

}

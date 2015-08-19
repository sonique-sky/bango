package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sky.sns.spm.domain.model.DomainTeam;
import sonique.bango.service.TeamApiService;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api/teams")
public class TeamApiController {

    @Resource
    private TeamApiService teamApiService;


    @RequestMapping(method = {RequestMethod.GET})
    @ResponseBody
    public List<DomainTeam> teams() {
        return teamApiService.teams();
    }

}

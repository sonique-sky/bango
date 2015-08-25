package sonique.bango.service;

import sky.sns.spm.domain.model.DomainTeam;
import spm.domain.TeamId;

import java.util.List;

public interface TeamApiService {
    List<DomainTeam> teams();

    DomainTeam addTeam(DomainTeam team);

    DomainTeam getTeam(TeamId teamId);
}

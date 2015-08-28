package sonique.bango.service;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import spm.domain.TeamId;

public interface TeamApiService {
    PagedSearchResults<DomainTeam> teams(Integer start, Integer limit);

    DomainTeam addTeam(DomainTeam team);

    DomainTeam getTeam(TeamId teamId);

    DomainTeam updateTeam(DomainTeam team);

    DomainTeam deleteTeam(DomainTeam team);
}

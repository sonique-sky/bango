package sonique.bango.service;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.controller.RequestParameters;
import spm.domain.TeamId;

public interface TeamApiService {
    PagedSearchResults<DomainTeam> readTeams(RequestParameters requestParameters);

    DomainTeam createTeam(DomainTeam team);

    DomainTeam getTeam(TeamId teamId);

    DomainTeam updateTeam(DomainTeam team);

    DomainTeam deleteTeam(DomainTeam team);
}

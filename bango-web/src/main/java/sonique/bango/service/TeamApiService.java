package sonique.bango.service;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import spm.domain.TeamId;

public interface TeamApiService {
    DomainTeam createTeam(DomainTeam team);

    PagedSearchResults<DomainTeam> readTeams(SearchParametersDTO searchParameters);

    DomainTeam getTeam(TeamId teamId);

    DomainTeam updateTeam(DomainTeam team);

    DomainTeam deleteTeam(DomainTeam team);
}

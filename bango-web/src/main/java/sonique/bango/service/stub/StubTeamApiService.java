package sonique.bango.service.stub;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.infrastructure.repository.DomainTeamRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.validation.SpmError;
import sky.sns.spm.validation.SupermanException;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.service.TeamApiService;
import spm.domain.TeamId;

import static sonique.bango.util.PagedSearchResultsCreator.createPageFor;

public class StubTeamApiService implements TeamApiService {

    private final DomainTeamRepository domainTeamRepository;
    private TeamComparators teamComparatorProviderProvider = new TeamComparators();

    public StubTeamApiService(DomainTeamRepository domainTeamRepository) {
        this.domainTeamRepository = domainTeamRepository;
    }

    @Override
    public PagedSearchResults<DomainTeam> readTeams(SearchParametersDTO searchParameters) {
        return createPageFor(searchParameters, domainTeamRepository.getTeams(), teamComparatorProviderProvider);
    }

    @Override
    public DomainTeam createTeam(DomainTeam team) {
        domainTeamRepository.insert(team);
        return team;
    }

    @Override
    public DomainTeam getTeam(TeamId teamId) {
        return domainTeamRepository.getTeam(teamId);
    }

    @Override
    public DomainTeam updateTeam(DomainTeam team) {
        domainTeamRepository.insert(team);
        return team;
    }

    @Override
    public DomainTeam deleteTeam(DomainTeam team) {
        throw new SupermanException(SpmError.SystemBusy);
    }

    private static class TeamComparators extends Comparators<DomainTeam> {
        public TeamComparators() {
            add("name", (o1, o2) -> o1.name().compareTo(o2.name()));
            add("id", (o1, o2) -> o1.id().compareTo(o2.id()));
        }
    }
}

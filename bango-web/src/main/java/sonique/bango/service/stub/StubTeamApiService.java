package sonique.bango.service.stub;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.infrastructure.repository.DomainTeamRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.validation.SpmError;
import sky.sns.spm.validation.SupermanException;
import sonique.bango.controller.RequestParameters;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.domain.sorter.Sorter;
import sonique.bango.service.TeamApiService;
import spm.domain.TeamId;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static sonique.bango.util.PagedSearchResultsCreator.createPageFor;

public class StubTeamApiService implements TeamApiService {

    private final DomainTeamRepository domainTeamRepository;
    private TeamComparators teamComparatorProviderProvider = new TeamComparators();

    public StubTeamApiService(DomainTeamRepository domainTeamRepository) {
        this.domainTeamRepository = domainTeamRepository;
    }

    @Override
    public PagedSearchResults<DomainTeam> readTeams(RequestParameters requestParameters) {
        return createPageFor(requestParameters, domainTeamRepository.getTeams(), teamComparatorProviderProvider, Optional.empty());
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
        private Map<String, Comparator<DomainTeam>> comparators = new HashMap<>();

        public TeamComparators() {
            comparators.put("name", (o1, o2) -> o1.name().compareTo(o2.name()));
            comparators.put("id", (o1, o2) -> o1.id().compareTo(o2.id()));
        }

        @Override
        protected Comparator<DomainTeam> getComparator(Sorter sorter) {
            return comparators.get(sorter.getProperty());
        }
    }
}

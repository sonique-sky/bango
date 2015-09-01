package sonique.bango.service.stub;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.infrastructure.repository.DomainTeamRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.validation.SpmError;
import sky.sns.spm.validation.SupermanException;
import sonique.bango.service.TeamApiService;
import spm.domain.TeamId;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class StubTeamApiService implements TeamApiService {

    private final DomainTeamRepository domainTeamRepository;

    public StubTeamApiService(DomainTeamRepository domainTeamRepository) {
        this.domainTeamRepository = domainTeamRepository;
    }

    @Override
    public PagedSearchResults<DomainTeam> teams(Integer start, Integer limit) {
        List<DomainTeam> allTeams = domainTeamRepository.getTeams();
        List<DomainTeam> pageOfTeams = allTeams.stream()
                .skip(start)
                .limit(limit)
                .collect(toList());

        return new PagedSearchResults<>(pageOfTeams, (long) allTeams.size());
    }

    @Override
    public DomainTeam addTeam(DomainTeam team) {
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
}

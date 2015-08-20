package sonique.bango.service.stub;

import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.infrastructure.repository.DomainTeamRepository;
import sonique.bango.service.TeamApiService;

import java.util.List;

public class StubTeamApiService implements TeamApiService {

    private final DomainTeamRepository domainTeamRepository;

    public StubTeamApiService(DomainTeamRepository domainTeamRepository) {
        this.domainTeamRepository = domainTeamRepository;
    }

    @Override
    public List<DomainTeam> teams() {
        return domainTeamRepository.getTeams();
    }
}

package sonique.bango.store;

import sky.sns.spm.domain.model.DomainTeam;
import spm.domain.TeamId;
import spm.domain.TeamName;

import java.util.Arrays;
import java.util.List;

public class TeamStore implements sky.sns.spm.infrastructure.repository.DomainTeamRepository {
    private List<DomainTeam> domainTeams;

    public TeamStore() {
        domainTeams = Arrays.asList(
                new DomainTeam(new TeamName("My favorite Team")),
                new DomainTeam(new TeamName("My second favorite Team")),
                new DomainTeam(new TeamName("My least favorite Team"))
        );
    }

    @Override
    public DomainTeam getTeam(TeamId teamId) {
        throw new UnsupportedOperationException("Method TeamStore getTeam() not yet implemented");
    }

    @Override
    public List<DomainTeam> getTeams() {
        return domainTeams;
    }

    @Override
    public void insert(DomainTeam domainTeam) {
        throw new UnsupportedOperationException("Method TeamStore insert() not yet implemented");
    }

    @Override
    public boolean isNameDuplicate(TeamName teamName) {
        throw new UnsupportedOperationException("Method TeamStore isNameDuplicate() not yet implemented");
    }
}

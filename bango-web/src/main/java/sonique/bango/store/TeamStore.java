package sonique.bango.store;

import com.google.common.base.Throwables;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.validation.SpmError;
import sky.sns.spm.validation.SupermanException;
import spm.domain.TeamId;
import spm.domain.TeamName;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class TeamStore implements sky.sns.spm.infrastructure.repository.DomainTeamRepository {
    private List<DomainTeam> domainTeams = new ArrayList<>();
    private long id = 0;

    public TeamStore() {
        insert(new DomainTeam(new TeamName("My favorite Team")));
        insert(new DomainTeam(new TeamName("My second favorite Team")));
        insert(new DomainTeam(new TeamName("My least favorite Team")));
    }

    @Override
    public DomainTeam getTeam(TeamId teamId) {
        return domainTeams.stream().filter(team -> team.id().equals(teamId)).findFirst().get();
    }

    @Override
    public List<DomainTeam> getTeams() {
        return domainTeams;
    }

    @Override
    public void insert(DomainTeam domainTeam) {
        if (isNameDuplicate(domainTeam.name())) {
            throw new SupermanException(SpmError.TeamAlreadyExists);
        }

        try {
            Field idField = DomainTeam.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(domainTeam, new TeamId(id++));
        } catch (NoSuchFieldException | IllegalAccessException e) {
            Throwables.propagate(e);
        }
        domainTeams.add(domainTeam);
    }

    @Override
    public boolean isNameDuplicate(TeamName teamName) {
        return domainTeams.stream().filter((team) -> team.name().equals(teamName)).findAny().isPresent();
    }
}

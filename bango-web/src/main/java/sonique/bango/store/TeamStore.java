package sonique.bango.store;

import com.google.common.base.Throwables;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.validation.SpmError;
import sky.sns.spm.validation.SupermanException;
import spm.domain.TeamId;
import spm.domain.TeamName;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

public class TeamStore implements sky.sns.spm.infrastructure.repository.DomainTeamRepository {
    private Map<TeamId, DomainTeam> domainTeamMap = new HashMap<>();
    private long id = 0;

    public TeamStore() {
        insert(new DomainTeam(new TeamName("My favorite Team")));
        insert(new DomainTeam(new TeamName("My second favorite Team")));
        insert(new DomainTeam(new TeamName("My least favorite Team")));
    }

    @Override
    public DomainTeam getTeam(TeamId teamId) {
        return domainTeamMap.get(teamId);
    }

    @Override
    public List<DomainTeam> getTeams() {
        return domainTeamMap.values().stream().collect(toList());
    }

    @Override
    public void insert(DomainTeam domainTeam) {
        Optional<DomainTeam> existingTeam = Optional.ofNullable(domainTeamMap.get(domainTeam.id()));

        if (existingTeam.isPresent()) {
            if (!existingTeam.get().equals(domainTeam) && isNameDuplicate(domainTeam.name())) {
                throw new SupermanException(SpmError.TeamAlreadyExists);
            }
        } else {
            try {
                Field idField = DomainTeam.class.getDeclaredField("id");
                idField.setAccessible(true);
                idField.set(domainTeam, new TeamId(id++));
            } catch (NoSuchFieldException | IllegalAccessException e) {
                Throwables.propagate(e);
            }
        }
        domainTeamMap.put(domainTeam.id(), domainTeam);
    }

    @Override
    public boolean isNameDuplicate(TeamName teamName) {
        return getTeams().stream().filter((team) -> team.name().equals(teamName)).findAny().isPresent();
    }
}

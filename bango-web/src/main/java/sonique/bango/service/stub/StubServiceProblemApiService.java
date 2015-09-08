package sonique.bango.service.stub;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemEventHistoryItem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.ServiceProblemId;

import java.util.Date;
import java.util.List;

public class StubServiceProblemApiService implements ServiceProblemApiService {
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    public StubServiceProblemApiService(DomainServiceProblemRepository serviceProblemRepository, SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.serviceProblemRepository = serviceProblemRepository;
        this.authorisedActorProvider = authorisedActorProvider;
    }

    @Override
    public DomainServiceProblem serviceProblemWithId(ServiceProblemId serviceProblemId) {
        return serviceProblemRepository.findByServiceProblemId(serviceProblemId);
    }

    @Override
    public EventHistoryItem addNote(ServiceProblemId serviceProblemId, String note) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        DomainAgent agent = authorisedActorProvider.getLoggedInAgent();
        serviceProblem.addNote(agent, note);
        return ServiceProblemEventHistoryItem.createEvent(EventDescription.Note, new Date(), agent.getAgentCode(), note, serviceProblem);
    }

    @Override
    public List<EventHistoryItem> eventHistory(ServiceProblemId serviceProblemId) {
        return serviceProblemWithId(serviceProblemId).historyItems();
    }

    @Override
    public DomainServiceProblem pull(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.tug(authorisedActorProvider.getLoggedInAgent());
        return serviceProblem;
    }

    @Override
    public DomainServiceProblem hold(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.holdWorkItem(authorisedActorProvider.getLoggedInAgent());

        return serviceProblem;
    }

    @Override
    public DomainServiceProblem release(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.unholdWorkItem(authorisedActorProvider.getLoggedInAgent());

        return serviceProblem;
    }

    @Override
    public DomainServiceProblem createWorkReminder(ServiceProblemId serviceProblemId, Date dateTime) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.createWorkReminder(
                authorisedActorProvider.getLoggedInAgent(),
                dateTime
        );

        return serviceProblem;
    }
}

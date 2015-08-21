package sonique.bango.service.stub;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.ServiceProblemId;

import java.util.Collection;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

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
    public List<EventHistoryItem> addNote(ServiceProblemId serviceProblemId, String note) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.addNote(authorisedActorProvider.getLoggedInAgent(), note);
        return serviceProblem.historyItems();
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
    public Collection<DomainServiceProblem> hold(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.holdWorkItem(authorisedActorProvider.getLoggedInAgent());

        return newArrayList(serviceProblem);
    }

    @Override
    public Collection<DomainServiceProblem> release(ServiceProblemId serviceProblemId) {
        DomainServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.unholdWorkItem(authorisedActorProvider.getLoggedInAgent());

        return newArrayList(serviceProblem);
    }
}

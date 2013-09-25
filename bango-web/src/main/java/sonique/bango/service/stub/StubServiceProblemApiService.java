package sonique.bango.service.stub;

import sonique.bango.domain.EventHistoryItem;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.service.ServiceProblemApiService;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class StubServiceProblemApiService implements ServiceProblemApiService {
    private final ServiceProblemStore serviceProblemStore;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    public StubServiceProblemApiService(ServiceProblemStore serviceProblemStore, SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.serviceProblemStore = serviceProblemStore;
        this.authorisedActorProvider = authorisedActorProvider;
    }

    @Override
    public Collection<ServiceProblem> serviceProblemsById(int serviceProblemId) {
        return serviceProblemStore.serviceProblemsById(serviceProblemId);
    }

    @Override
    public ServiceProblem serviceProblemWithId(int serviceProblemId) {
        return serviceProblemStore.serviceProblemWithId(serviceProblemId);
    }

    @Override
    public List<EventHistoryItem> addNote(int serviceProblemId, String note) {
        ServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.addNote(new EventHistoryItem("Note", note, new Date(), "Me"));
        return serviceProblem.eventHistoryItems();
    }

    @Override
    public Collection<ServiceProblem> pull(int serviceProblemId) {
        ServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.assignTo(authorisedActorProvider.authenticatedAgent());

        return newArrayList(serviceProblem);
    }

    @Override
    public Collection<ServiceProblem> hold(int serviceProblemId) {
        ServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.holdActiveWorkItem();

        return newArrayList(serviceProblem);
    }

    @Override
    public Collection<ServiceProblem> release(int serviceProblemId) {
        ServiceProblem serviceProblem = serviceProblemWithId(serviceProblemId);
        serviceProblem.unholdActiveWorkItem();

        return newArrayList(serviceProblem);
    }
}

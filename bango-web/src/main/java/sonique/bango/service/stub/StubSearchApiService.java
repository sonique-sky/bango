package sonique.bango.service.stub;

import sonique.bango.domain.ServiceProblem;
import sonique.bango.service.SearchApiService;
import sonique.bango.store.ServiceProblemStore;
import sun.management.resources.agent;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class StubSearchApiService implements SearchApiService {
    private final ServiceProblemStore serviceProblemStore;

    public StubSearchApiService(ServiceProblemStore serviceProblemStore) {
        this.serviceProblemStore = serviceProblemStore;
    }

    @Override
    public Collection<ServiceProblem> serviceProblemById(int serviceProblemId) {
        return serviceProblemStore.serviceProblemsById(serviceProblemId);
    }

    @Override
    public Collection<ServiceProblem> serviceProblemByDirectoryNumber(String directoryNumber) {
        return serviceProblemStore.serviceProblemByDirectoryNumber(directoryNumber);
    }

    @Override
    public Collection<ServiceProblem> serviceProblemsByServiceId(String serviceId) {
        return newArrayList();
    }

    @Override
    public Collection<ServiceProblem> serviceProblemsByMspId(String mspId) {
        return newArrayList();
    }
}

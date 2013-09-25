package sonique.bango.service;

import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.ServiceProblemStore;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class MySearchApiService implements SearchApiService {
    private final ServiceProblemStore serviceProblemStore;

    public MySearchApiService(ServiceProblemStore serviceProblemStore) {
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

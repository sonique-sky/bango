package sonique.bango.service;

import sonique.bango.domain.ServiceProblem;

import java.util.Collection;

public interface SearchApiService {
    Collection<ServiceProblem> serviceProblemById(int serviceProblemId);
    Collection<ServiceProblem> serviceProblemByDirectoryNumber(String directoryNumber);
    Collection<ServiceProblem> serviceProblemsByServiceId(String serviceId);
    Collection<ServiceProblem> serviceProblemsByMspId(String mspId);
}

package sonique.bango.app;

import sonique.bango.service.ServiceProblemApiService;

import static org.mockito.Mockito.mock;

public class ServiceWrapper {
    private final ServiceProblemApiService serviceProblemApiService;

    public ServiceWrapper() {
        serviceProblemApiService = mock(ServiceProblemApiService.class);
    }

    public ServiceProblemApiService serviceProblemApiService() {
        return serviceProblemApiService;
    }
}

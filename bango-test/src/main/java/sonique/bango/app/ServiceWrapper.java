package sonique.bango.app;

import sonique.bango.service.ServiceProblemApiService;
import sonique.bango.service.TroubleReportApiService;

import static org.mockito.Mockito.mock;

public class ServiceWrapper {
    private final ServiceProblemApiService serviceProblemApiService;
    private final TroubleReportApiService troubleReportApiService;

    public ServiceWrapper() {
        serviceProblemApiService = mock(ServiceProblemApiService.class);
        troubleReportApiService = mock(TroubleReportApiService.class);
    }

    public ServiceProblemApiService serviceProblemApiService() {
        return serviceProblemApiService;
    }

    public TroubleReportApiService troubleReportApiService() {
        return troubleReportApiService;
    }
}

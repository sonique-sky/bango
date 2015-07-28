package sonique.bango.service.stub;

import com.google.common.base.Function;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.service.QueueApiService;
import sonique.bango.store.QueueStore;
import spm.domain.ServiceProblemId;

import java.util.Collection;

import static com.google.common.collect.Collections2.transform;
import static util.SupermanDataFixtures.someServiceProblemResolution;

public class StubQueueApiService implements QueueApiService {

    private final QueueRepository queueRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    public StubQueueApiService(QueueRepository queueRepository, DomainServiceProblemRepository serviceProblemRepository, SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.queueRepository = queueRepository;
        this.serviceProblemRepository = serviceProblemRepository;
        this.authorisedActorProvider = authorisedActorProvider;
    }

    @Override
    public Collection<Queue> allQueues() {
        return queueRepository.getAllQueues();
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> serviceProblemsFor(int queueId) {
        return serviceProblemRepository.searchForServiceProblemsInQueue(SearchParametersDTO.withSearchProperties("queueId", (long) queueId, 20, 0));
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> bulkTransfer(BulkTransferRequest request) {
        Collection<ServiceProblemId> serviceProblemIds = transformServiceProblemIds(request.serviceProblemIds());

        Queue destinationQueue = queueRepository.findQueueBy(request.destinationQueueId());
        for (ServiceProblemId serviceProblemId : serviceProblemIds) {
            DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
            serviceProblem.transfer(destinationQueue);
        }

        return serviceProblemsFor(request.originalQueueId().asInteger());
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> bulkClear(BulkClearRequest request) {
        Collection<ServiceProblemId> serviceProblemIds = transformServiceProblemIds(request.serviceProblemIds());

        for (ServiceProblemId serviceProblemId : serviceProblemIds) {
            DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
            serviceProblem.bulkClear(someServiceProblemResolution(), authorisedActorProvider.authorisedActor());
        }

        return serviceProblemsFor(request.originalQueueId().asInteger());
    }

    private Collection<ServiceProblemId> transformServiceProblemIds(Collection<Long> serviceProblemIds) {
        return transform(serviceProblemIds, new Function<Long, ServiceProblemId>() {
            @Override
            public ServiceProblemId apply(Long idAsInteger) {
                return new ServiceProblemId(idAsInteger);
            }
        });
    }
}

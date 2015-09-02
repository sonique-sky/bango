package sonique.bango.service.stub;

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
import spm.domain.ServiceProblemId;

import java.util.Collection;
import java.util.List;

import static com.google.common.collect.Collections2.transform;
import static java.util.stream.Collectors.toList;
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
    public PagedSearchResults<Queue> allQueues(Integer start, Integer limit) {
        List<Queue> allQueues = queueRepository.getAllQueues();
        List<Queue> pageOfQueues = allQueues.stream()
                .skip(start)
                .limit(limit)
                .collect(toList());

        return new PagedSearchResults<>(pageOfQueues, (long) allQueues.size());
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> serviceProblemsFor(int queueId, Integer page, Integer start, Integer limit) {
        return serviceProblemRepository.searchForServiceProblemsInQueue(SearchParametersDTO.withSearchProperties("queueId", (long) queueId, limit, start));
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> bulkTransfer(BulkTransferRequest request) {
        Collection<ServiceProblemId> serviceProblemIds = transformServiceProblemIds(request.serviceProblemIds());

        Queue destinationQueue = queueRepository.findQueueBy(request.destinationQueueId());
        for (ServiceProblemId serviceProblemId : serviceProblemIds) {
            DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
            serviceProblem.transfer(destinationQueue);
        }

        return serviceProblemsFor(request.originalQueueId().asInteger(), null, 0, 20);
    }

    @Override
    public Queue updateQueue(Queue queue) {
        //TODO Update SPM repo to return updated queue
        queueRepository.update(queue);
        return queue;
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> bulkClear(BulkClearRequest request) {
        Collection<ServiceProblemId> serviceProblemIds = transformServiceProblemIds(request.serviceProblemIds());

        for (ServiceProblemId serviceProblemId : serviceProblemIds) {
            DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
            serviceProblem.bulkClear(someServiceProblemResolution(), authorisedActorProvider.authorisedActor());
        }

        return serviceProblemsFor(request.originalQueueId().asInteger(), null, 0, 20);
    }

    private Collection<ServiceProblemId> transformServiceProblemIds(Collection<Long> serviceProblemIds) {
        return transform(serviceProblemIds, ServiceProblemId::new);
    }
}

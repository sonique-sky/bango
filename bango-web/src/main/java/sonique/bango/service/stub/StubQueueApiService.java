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
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.domain.sorter.Sorter;
import sonique.bango.service.QueueApiService;
import spm.domain.ServiceProblemId;

import java.util.*;

import static com.google.common.collect.Collections2.transform;
import static java.util.stream.Collectors.toList;
import static sonique.bango.domain.sorter.Comparators.aggregatedComparator;
import static util.SupermanDataFixtures.someServiceProblemResolution;

public class StubQueueApiService implements QueueApiService {

    private final QueueRepository queueRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final QueueComparators queueComparatorProviderProvider;

    public StubQueueApiService(QueueRepository queueRepository,
                               DomainServiceProblemRepository serviceProblemRepository,
                               SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.queueRepository = queueRepository;
        this.serviceProblemRepository = serviceProblemRepository;
        this.authorisedActorProvider = authorisedActorProvider;
        this.queueComparatorProviderProvider = new QueueComparators();
    }

    @Override
    public PagedSearchResults<Queue> allQueues(Integer start, Integer limit, List<Sorter> sorters) {

        List<Queue> allQueues = queueRepository.getAllQueues();

        List<Queue> pageOfQueues = allQueues.stream()
                .sorted(aggregatedComparator(sorters.stream().map(queueComparatorProviderProvider::comparatorFor).collect(toList())))
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
    public Queue createQueue(Queue queue) {
        return queueRepository.insert(queue);
    }

    @Override
    public Queue deleteQueue(Queue queue) {
        //TODO Update SPM repo to return updated queue
        queueRepository.deleteQueue(queue);
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

    private static class QueueComparators extends Comparators<Queue> {
        private Map<String, Comparator<Queue>> comparators = new HashMap<>();

        public QueueComparators() {
            comparators.put("name", (o1, o2) -> o1.getName().compareTo(o2.getName()));
            comparators.put("pullSla", (o1, o2) -> compareLong(o1.getPullSla(), o2.getPullSla()));
            comparators.put("manualTransferAllowed", (o1, o2) -> compareBoolean(o1.isManualTransferAllowed(), o2.isManualTransferAllowed()));
            comparators.put("createServiceProblemAllowed", (o1, o2) -> compareBoolean(o1.isCreateServiceProblemAllowed(), o2.isCreateServiceProblemAllowed()));
            comparators.put("defaultWorkItemCreated", (o1, o2) -> compareBoolean(o1.isDefaultWorkItemCreated(), o2.isDefaultWorkItemCreated()));
            comparators.put("createSLAWorkItem", (o1, o2) -> compareBoolean(o1.isCreateSLAWorkItem(), o2.isCreateSLAWorkItem()));
            comparators.put("domain", (o1, o2) -> o1.getDomain().compareTo(o2.getDomain()));
        }

        @Override
        protected Comparator<Queue> getComparator(Sorter sorter) {
            return comparators.get(sorter.getProperty());
        }
    }
}

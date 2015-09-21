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
import sonique.bango.service.QueueApiService;
import spm.domain.ServiceProblemId;

import java.util.Collection;

import static com.google.common.collect.Collections2.transform;
import static sonique.bango.util.PagedSearchResultsCreator.createPageFor;
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
    public PagedSearchResults<Queue> readQueues(SearchParametersDTO searchParameters) {
        return createPageFor(searchParameters, queueRepository.getAllQueues(), queueComparatorProviderProvider);
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
    public void bulkTransfer(BulkTransferRequest request) {
        Collection<ServiceProblemId> serviceProblemIds = transformServiceProblemIds(request.serviceProblemIds());

        Queue destinationQueue = queueRepository.findQueueBy(request.destinationQueueId());
        for (ServiceProblemId serviceProblemId : serviceProblemIds) {
            DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
            serviceProblem.transfer(destinationQueue);
        }
    }

    @Override
    public void bulkClear(BulkClearRequest request) {
        Collection<ServiceProblemId> serviceProblemIds = transformServiceProblemIds(request.serviceProblemIds());

        for (ServiceProblemId serviceProblemId : serviceProblemIds) {
            DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(serviceProblemId);
            serviceProblem.bulkClear(someServiceProblemResolution(), authorisedActorProvider.authorisedActor());
        }
    }

    private Collection<ServiceProblemId> transformServiceProblemIds(Collection<Long> serviceProblemIds) {
        return transform(serviceProblemIds, ServiceProblemId::new);
    }

    private static class QueueComparators extends Comparators<Queue> {
        public QueueComparators() {
            add("name", (o1, o2) -> o1.getName().compareTo(o2.getName()));
            add("pullSla", (o1, o2) -> compareLong(o1.getPullSla(), o2.getPullSla()));
            add("manualTransferAllowed", (o1, o2) -> compareBoolean(o1.isManualTransferAllowed(), o2.isManualTransferAllowed()));
            add("createServiceProblemAllowed", (o1, o2) -> compareBoolean(o1.isCreateServiceProblemAllowed(), o2.isCreateServiceProblemAllowed()));
            add("defaultWorkItemCreated", (o1, o2) -> compareBoolean(o1.isDefaultWorkItemCreated(), o2.isDefaultWorkItemCreated()));
            add("createSLAWorkItem", (o1, o2) -> compareBoolean(o1.isCreateSLAWorkItem(), o2.isCreateSLAWorkItem()));
            add("domain", (o1, o2) -> o1.getDomain().compareTo(o2.getDomain()));
        }
    }
}

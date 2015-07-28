package sonique.bango.store;

import com.google.common.base.Predicate;
import sky.sns.spm.domain.model.QueueDashboardEntry;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import spm.domain.QueueId;
import spm.domain.model.refdata.QueueBuilder;

import java.util.List;

import static com.google.common.collect.Iterables.find;
import static com.google.common.collect.Lists.newArrayList;

public class QueueStore implements QueueRepository {

    private final List<Queue> allQueues;

    public QueueStore() {
        allQueues = newArrayList();
        for (int i = 0; i < 10; i++) {
            allQueues.add(new QueueBuilder().build());
        }
    }

    @Override
    public Queue findQueueBy(final QueueId queueId) {
        return find(allQueues, new Predicate<Queue>() {
            @Override
            public boolean apply(Queue input) {
                return input.id().equals(queueId);
            }
        });
    }

    @Override
    public List<Queue> findQueuesThatAllowManualTransfer() {
        throw new UnsupportedOperationException("Method QueueStore findQueuesThatAllowManualTransfer() not yet implemented");
    }

    @Override
    public List<QueueDashboardEntry> getQueueDashboardEntries() {
        throw new UnsupportedOperationException("Method QueueStore getQueueDashboardEntries() not yet implemented");
    }


    @Override
    public Queue findOpenreachQueueForServiceType(PresentedServiceType presentedServiceType) {
        throw new UnsupportedOperationException("Method QueueStore findOpenreachQueueForServiceType() not yet implemented");
    }

    @Override
    public void deleteQueue(Queue queue) {
        throw new UnsupportedOperationException("Method QueueStore deleteQueue() not yet implemented");
    }

    @Override
    public List<Queue> getAllQueues() {
        return allQueues;
    }

    @Override
    public Queue findQueueForMajorServiceProblem() {
        throw new UnsupportedOperationException("Method QueueStore findQueueForMajorServiceProblem() not yet implemented");
    }

    @Override
    public Queue insert(Queue queue) {
        throw new UnsupportedOperationException("Method QueueStore insert() not yet implemented");
    }

    @Override
    public boolean wouldCauseDuplicateQueueNameOnUpdate(Queue queue) {
        throw new UnsupportedOperationException("Method QueueStore wouldCauseDuplicateQueueNameOnUpdate() not yet implemented");
    }

    @Override
    public boolean wouldCauseDuplicateQueueNameOnInsert(Queue queue) {
        throw new UnsupportedOperationException("Method QueueStore wouldCauseDuplicateQueueNameOnInsert() not yet implemented");
    }

    @Override
    public void update(Queue updatedQueue) {
        throw new UnsupportedOperationException("Method QueueStore update() not yet implemented");
    }
}

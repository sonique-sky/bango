package sonique.bango.store;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import sonique.bango.domain.Queue;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class QueueStore {

    private final List<Queue> allQueues;

    public QueueStore(List<Queue> numberOfQueues) {
        this.allQueues = numberOfQueues;
    }

    public List<Queue> allQueues() {
        return allQueues;
    }

    public Queue queueById(final Integer id) {
        return Iterables.find(allQueues, new Predicate<Queue>() {
            public boolean apply(Queue input) {
                return input.id().equals(id);
            }
        });
    }

    public int numberOfQueues() {
        return allQueues.size();
    }
}

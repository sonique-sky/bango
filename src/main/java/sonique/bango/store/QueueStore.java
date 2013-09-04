package sonique.bango.store;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import sonique.bango.domain.Queue;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class QueueStore {

    private final List<Queue> allQueues = newArrayList();

    public QueueStore() {
        for(int i=1; i<11; i++) {
            allQueues.add(new Queue(i, "Queue "+i));
        }
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

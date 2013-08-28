package sonique.bango.store;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import sonique.bango.domain.Queue;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class QueueStore {

    private static final List<Queue> allQueues = newArrayList(
            new Queue(1, "Queue 1"),
            new Queue(2, "Queue 2"),
            new Queue(3, "Queue 3"),
            new Queue(4, "Queue 4"),
            new Queue(5, "Queue 5"),
            new Queue(6, "Queue 6"),
            new Queue(7, "Queue 7"),
            new Queue(8, "Queue 8"),
            new Queue(9, "Queue 9"),
            new Queue(10, "Queue 10")
    );

    public static List<Queue> allQueues() {
        return allQueues;
    }

    public Queue queueById(final Integer id) {
        return Iterables.find(allQueues, new Predicate<Queue>() {
            public boolean apply(Queue input) {
                return input.id().equals(id);
            }
        });
    }
}

package sonique.bango;

import sonique.bango.domain.*;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.util.Date;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class BangoBuilder {
    private int serviceProblemsPerQueue = 10;
    private int numberOfQueues = 30;


    public BangoBuilder withQueues(int numberOfQueues) {
        this.numberOfQueues = numberOfQueues;
        return this;
    }

    public BangoBuilder withServiceProblemsPerQueue(int serviceProblemsPerQueue) {
        this.serviceProblemsPerQueue = serviceProblemsPerQueue;
        return this;
    }

    public Bango build() {
        List<Queue> queues = newArrayList();
        for (int i = 1; i <= numberOfQueues; i++) {
            queues.add(new Queue(i, "Queue " + i));
        }

        QueueStore queueStore = new QueueStore(queues);

        AgentStore agentStore = new AgentStore();
        agentStore.registerAgent(new Agent("A.A", queues));
        agentStore.registerAgent(new Agent("B.B", queues));
        agentStore.registerAgent(new Agent("C.C", queues));


        Integer directoryNumber = 111;

        List<ServiceProblem> serviceProblems = newArrayList();
        for (int index = 0; index < numberOfQueues * serviceProblemsPerQueue; index++) {
            int queueId = (index / serviceProblemsPerQueue) + 1;
            directoryNumber = index % 2 == 0 ? directoryNumber : ++directoryNumber;
            serviceProblems.add(
                    new ServiceProblem(
                            index,
                            "Open",
                            new WorkItem(index + serviceProblemsPerQueue, "Unassigned"),
                            queueStore.queueById(queueId),
                            index % 2 == 0,
                            directoryNumber.toString(),
                            historyItems(index)
                    )
            );
        }

        return new Bango(queueStore, agentStore, new ServiceProblemStore(serviceProblems));
    }

    private List<EventHistoryItem> historyItems(int index) {
        List<EventHistoryItem> historyItems = newArrayList();
        Date today = new Date();
        for (int i = 1; i < 11; i++) {
            historyItems.add(new EventHistoryItem(uniqueString("EventType", index, i), uniqueString("Notes Notes Notes Notes Notes Notes", index, i), uniqueDate(today, i), uniqueString("By", index, i)));
        }
        return historyItems;
    }

    private Date uniqueDate(Date today, int index) {
        return new Date(today.getTime() - index * 24 * 60 * 60 * 1000);
    }

    private String uniqueString(String prefix, int index1, int index2) {
        return String.format("%s-%d-%d", prefix, index1, index2);
    }


}

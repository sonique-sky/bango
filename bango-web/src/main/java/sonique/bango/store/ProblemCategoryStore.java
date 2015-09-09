package sonique.bango.store;

import com.google.common.collect.Maps;
import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.QueueRoutingKey;
import sky.sns.spm.infrastructure.repository.DomainProblemCategoryRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import static java.util.stream.Collectors.toList;
import static sky.sns.spm.domain.model.refdata.AssignmentCode.standard;
import static sky.sns.spm.domain.model.refdata.QueueRoutingKey.routingKeyOf;
import static sonique.datafixtures.PrimitiveDataFixtures.*;
import static util.SupermanDataFixtures.*;

public class ProblemCategoryStore implements DomainProblemCategoryRepository {

    private final Map<Long, ProblemCategory> store;

    public ProblemCategoryStore() {
        store = Maps.newHashMap();
        AtomicLong id = new AtomicLong(0);

        for (int i = 0; i < 100; i++) {
            ProblemCategory problemCategory = new ProblemCategory(id.getAndIncrement(), someString(), someWords(), someBoolean());
            Map<QueueRoutingKey, Queue> presentedServiceTypeQueueMap = Maps.newHashMap();
            presentedServiceTypeQueueMap.put(routingKeyOf(standard(), somePresentedServiceType()), someQueue());
            presentedServiceTypeQueueMap.put(routingKeyOf(someAssignmentCode(), somePresentedServiceType()), someQueue());
            presentedServiceTypeQueueMap.put(routingKeyOf(standard(), somePresentedServiceType()), someQueue());
            presentedServiceTypeQueueMap.put(routingKeyOf(standard(), somePresentedServiceType()), someQueue());
            presentedServiceTypeQueueMap.put(routingKeyOf(standard(), somePresentedServiceType()), someQueue());
            problemCategory.setQueueRouting(presentedServiceTypeQueueMap);
            store.put(problemCategory.problemId(), problemCategory);
        }
    }


    @Override
    public PagedSearchResults<ProblemCategory> findProblemCategoriesSubSet(SearchParametersDTO searchParameters) {
        throw new UnsupportedOperationException("Method ProblemCategoryStore findProblemCategoriesSubSet() not yet implemented");
    }

    @Override
    public ProblemCategory persist(ProblemCategory problemCategory) {
        throw new UnsupportedOperationException("Method ProblemCategoryStore persist() not yet implemented");
    }

    @Override
    public List<ProblemCategory> getAll() {
        return store.values()
                .stream()
                .collect(toList());
    }

    @Override
    public ProblemCategory getByCode(String code) {
        throw new UnsupportedOperationException("Method ProblemCategoryStore getByCode() not yet implemented");
    }
}

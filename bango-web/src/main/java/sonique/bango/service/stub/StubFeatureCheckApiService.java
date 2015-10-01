package sonique.bango.service.stub;

import sky.sns.spm.domain.model.featurecheck.Feature;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.FeatureCheckApiService;
import sonique.bango.store.FeatureCheckStore;
import spm.domain.Operator;
import spm.domain.SnsServiceId;

public class StubFeatureCheckApiService implements FeatureCheckApiService {
    private final FeatureCheckStore featureCheckStore;

    public StubFeatureCheckApiService(FeatureCheckStore featureCheckStore) {
        this.featureCheckStore = featureCheckStore;
    }

    @Override
    public PagedSearchResults<Feature> features(SnsServiceId serviceId, Operator operator, SearchParametersDTO searchParameters) {
        return featureCheckStore.features(serviceId, operator, searchParameters);
    }
}

package sonique.bango.service;

import sky.sns.spm.domain.model.featurecheck.Feature;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import spm.domain.Operator;
import spm.domain.SnsServiceId;

public interface FeatureCheckApiService {
    PagedSearchResults<Feature> features(SnsServiceId serviceId, Operator operator, SearchParametersDTO searchParameters);
}

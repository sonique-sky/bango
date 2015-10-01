package sonique.bango.store;

import sky.sns.spm.domain.model.featurecheck.Feature;
import sky.sns.spm.domain.model.featurecheck.FeatureActive;
import sky.sns.spm.domain.model.featurecheck.FeatureName;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.interfaces.featurecheck.KnownNvnServiceFeature;
import sky.sns.spm.interfaces.featurecheck.KnownWlr3ServiceFeature;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.datafixtures.PrimitiveDataFixtures;
import spm.domain.Operator;
import spm.domain.ServiceDetail;
import spm.domain.SnsServiceId;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FeatureCheckStore {
    private final ServiceDetailsStore serviceDetailsStore;

    public FeatureCheckStore(ServiceDetailsStore serviceDetailsStore) {
        this.serviceDetailsStore = serviceDetailsStore;
    }

    public PagedSearchResults<Feature> features(SnsServiceId serviceId, Operator operator, SearchParametersDTO searchParameters) {
        Optional<ServiceDetail> serviceDetail = Optional.ofNullable(serviceDetailsStore.getServiceDetail(serviceId));
        List<Feature> features = new ArrayList<>();

        if (serviceDetail.isPresent()) {
            PresentedServiceType presentedServiceType = serviceDetail.get().serviceType();
            if (presentedServiceType == PresentedServiceType.NvnVoice) {
                KnownNvnServiceFeature[] featureTypes = KnownNvnServiceFeature.values();
                KnownNvnServiceFeature assignedFeature = PrimitiveDataFixtures.pickOneOf(featureTypes);
                features = Stream.of(featureTypes)
                        .map(ks -> new Feature(new FeatureName(ks.featureName()), new FeatureActive(ks == assignedFeature)))
                        .collect(Collectors.toList());
            } else if (presentedServiceType == PresentedServiceType.WLR3) {
                KnownWlr3ServiceFeature[] featureTypes = KnownWlr3ServiceFeature.values();
                KnownWlr3ServiceFeature assignedFeature = PrimitiveDataFixtures.pickOneOf(featureTypes);
                features = Stream.of(featureTypes)
                        .map(ks -> new Feature(new FeatureName(ks.featureName()), new FeatureActive(ks == assignedFeature)))
                        .collect(Collectors.toList());
            }
        }

        return new PagedSearchResults<>(features, features.size());
    }
}

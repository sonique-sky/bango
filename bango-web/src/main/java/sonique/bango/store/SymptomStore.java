package sonique.bango.store;

import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
import static sky.sns.spm.domain.model.refdata.ServiceType.*;
import static util.SupermanDataFixtures.someTroubleReportSymptomFor;

public class SymptomStore {

    private final Map<ServiceType, List<DomainTroubleReportSymptom>> symptoms = new HashMap<>();

    public SymptomStore() {
        symptoms.put(WLR3, asList(someTroubleReportSymptomFor(WLR3), someTroubleReportSymptomFor(WLR3), someTroubleReportSymptomFor(WLR3)));
        symptoms.put(RoiFttc, asList(someTroubleReportSymptomFor(RoiFttc), someTroubleReportSymptomFor(RoiFttc), someTroubleReportSymptomFor(RoiFttc)));
        symptoms.put(RoiRuralOffnetBroadband, asList(someTroubleReportSymptomFor(RoiRuralOffnetBroadband), someTroubleReportSymptomFor(RoiRuralOffnetBroadband), someTroubleReportSymptomFor(RoiRuralOffnetBroadband)));
        symptoms.put(RoiUrbanOffnetBroadband, asList(someTroubleReportSymptomFor(RoiUrbanOffnetBroadband), someTroubleReportSymptomFor(RoiUrbanOffnetBroadband), someTroubleReportSymptomFor(RoiUrbanOffnetBroadband)));
        symptoms.put(RoiOffnetVoice, asList(someTroubleReportSymptomFor(RoiOffnetVoice), someTroubleReportSymptomFor(RoiOffnetVoice), someTroubleReportSymptomFor(RoiOffnetVoice)));
    }

    public List<DomainTroubleReportSymptom> findSymptomsBy(final ServiceType serviceType) {
        return symptoms.getOrDefault(serviceType, new ArrayList<>());
    }

}

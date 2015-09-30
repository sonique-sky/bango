package sonique.bango.store;

import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sonique.bti.messages.domain.BtiTelephoneNumber;
import spm.domain.*;
import spm.messages.bt.types.DirectoryNumber;
import spm.roi.RoiServiceStatus;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static spm.domain.WifiServiceDetail.wifiServiceDetail;
import static util.SupermanDataFixtures.someCircuitId;
import static util.SupermanDataFixtures.someSwitchServiceId;

public class ServiceDetailsStore {
    private final Map<SnsServiceId, ServiceDetail> serviceDetails = new HashMap<>();

    public void addServiceDetails(SnsServiceId serviceId, PresentedServiceType serviceType, Operator operator, DirectoryNumber directoryNumber) {
        Optional<ServiceDetail> serviceDetail = createServiceDetails(serviceType, operator, directoryNumber);
        serviceDetail.ifPresent(sd -> serviceDetails.put(serviceId, sd));
    }

    public ServiceDetail getServiceDetail(SnsServiceId serviceId) {
        return serviceDetails.get(serviceId);
    }

    private Optional<ServiceDetail> createServiceDetails(PresentedServiceType serviceType, Operator operator, DirectoryNumber directoryNumber) {
        switch (serviceType) {
            case NvnVoice:
            case WLR3:
                return Optional.of(someNetstreamServiceDetails(serviceType, operator, directoryNumber));
            case NvnData:
            case OffnetBroadband:
            case OnnetBroadband:
            case WLR:
            case FTTC:
                break;
            case WifiDataService:
                return Optional.of(wifiServiceDetail());
            case RoiOffnetVoice:
            case RoiRuralOffnetBroadband:
            case RoiUrbanOffnetBroadband:
            case RoiFttc:
                return Optional.of(someRoiServiceDetails(serviceType, directoryNumber));
        }

        return Optional.empty();
    }

    private ServiceDetail someRoiServiceDetails(PresentedServiceType serviceType, DirectoryNumber directoryNumber) {
        return RoiServiceDetail.roiServiceDetail(serviceType, new BtiTelephoneNumber(directoryNumber.asString()), RoiServiceStatus.Active);
    }


    private ServiceDetail someNetstreamServiceDetails(PresentedServiceType serviceType, Operator operator, DirectoryNumber directoryNumber) {
        return NetstreamServiceDetail.netstreamServiceDetail(
                serviceType,
                operator,
                someCircuitId(),
                someSwitchServiceId(),
                directoryNumber,
                new NetstreamServiceDetail.DataTie(someString(), someString()),
                new NetstreamServiceDetail.VoiceTie(someString(), someString()));
    }
}

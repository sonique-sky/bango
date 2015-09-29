package sonique.bango.matcher.panel;

import org.apache.commons.lang.StringUtils;
import org.hamcrest.Matcher;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemPanel;
import spm.domain.OperatorReference;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

import java.time.LocalDateTime;

public class ServiceProblemPanelMatchers {

    public static AbstractPanelMatcher<ServiceProblemPanel, ServiceProblemId> aServiceProblemId(Matcher<ServiceProblemId> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, ServiceProblemId>(matcher) {
            @Override
            protected ServiceProblemId actualValue(ServiceProblemPanel item) {
                return item.serviceProblemId();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, SnsServiceId> aServiceId(Matcher<SnsServiceId> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, SnsServiceId>(matcher) {
            @Override
            protected SnsServiceId actualValue(ServiceProblemPanel item) {
                return item.serviceId();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, ServiceProblemStatus> aServiceProblemStatus(Matcher<ServiceProblemStatus> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, ServiceProblemStatus>(matcher) {
            @Override
            protected ServiceProblemStatus actualValue(ServiceProblemPanel item) {
                return item.status();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, DirectoryNumber> aDirectoryNumber(Matcher<DirectoryNumber> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, DirectoryNumber>(matcher) {
            @Override
            protected DirectoryNumber actualValue(ServiceProblemPanel item) {
                return item.directoryNumber();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, QueueName> aQueueName(Matcher<QueueName> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, QueueName>(matcher) {
            @Override
            protected QueueName actualValue(ServiceProblemPanel item) {
                return item.queue();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, LocalDateTime> anOpenedDate(Matcher<LocalDateTime> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, LocalDateTime>(matcher) {
            @Override
            protected LocalDateTime actualValue(ServiceProblemPanel item) {
                return item.openedDate();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, LocalDateTime> aClosedDate(Matcher<LocalDateTime> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, LocalDateTime>(matcher) {
            @Override
            protected LocalDateTime actualValue(ServiceProblemPanel item) {
                return item.closedDate();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, PresentedServiceType> aServiceType(Matcher<PresentedServiceType> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, PresentedServiceType>(matcher) {
            @Override
            protected PresentedServiceType actualValue(ServiceProblemPanel item) {
                return item.serviceType();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> aCustomerName(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return StringUtils.trimToNull(item.customerName());
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> aContactNumber(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return StringUtils.trimToNull(item.contactNumber());
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> anOperatorAccountNumber(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return StringUtils.trimToNull(item.operatorAccountNumber());
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> aProblem(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return item.problem();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, OperatorReference> anOperatorReference(Matcher<OperatorReference> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, OperatorReference>(matcher) {
            @Override
            protected OperatorReference actualValue(ServiceProblemPanel item) {
                return item.operatorReference();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> aFault(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return item.fault();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> aCause(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return item.cause();
            }
        };
    }

    public static AbstractPanelMatcher<ServiceProblemPanel, String> aResolutionReason(Matcher<String> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, String>(matcher) {
            @Override
            protected String actualValue(ServiceProblemPanel item) {
                return item.resolutionReason();
            }
        };
    }
}

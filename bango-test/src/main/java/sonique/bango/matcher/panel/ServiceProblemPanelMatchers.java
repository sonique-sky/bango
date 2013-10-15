package sonique.bango.matcher.panel;

import org.hamcrest.Matcher;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemStatus;
import sonique.bango.driver.panel.ServiceProblemPanel;
import spm.domain.DirectoryNumber;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;

import java.util.Date;

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

    public static AbstractPanelMatcher<ServiceProblemPanel, Date> anOpenedDate(Matcher<Date> matcher) {
        return new AbstractPanelMatcher<ServiceProblemPanel, Date>(matcher) {
            @Override
            protected Date actualValue(ServiceProblemPanel item) {
                return item.openedDate();
            }
        };
    }
}

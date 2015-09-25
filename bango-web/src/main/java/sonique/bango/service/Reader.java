package sonique.bango.service;

import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

public interface Reader<T, C> {

    interface Specification<C> {
        C criteria();

        SearchParametersDTO searchParameters();
    }

    PagedSearchResults<T> read(Specification<C> specification);
}

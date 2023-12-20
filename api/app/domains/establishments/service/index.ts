import { findEstablishmentsByName } from "@student-sphere-domains/establishments/data-access";
import { formatSearch } from "@student-sphere-domains/establishments/service/helpers";

const searchEstablishments = async (establishmentName: string | undefined) => {
    const formattedSearch = formatSearch(establishmentName);
    return findEstablishmentsByName(formattedSearch);
};

export { searchEstablishments };
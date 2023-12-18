import { findEstablishmentByName } from "@student-sphere-domains/establishments/data-access";

const searchEstablishment = async (establishmentName: string) => {
    return findEstablishmentByName(establishmentName);
};

export { searchEstablishment };
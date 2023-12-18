import { Establishment, EstablishmentDbRow } from "../types/establishment";

import { parseEstablishmentsRow } from "./index";

describe("import-establishments/service/index.ts", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("parseEstablishmentsRow", () => {
        const establishmentMock: Establishment = {
            establishmentId: "0311713U",
            establishmentName: "Université de Paris",
            establishmentType: "Université",
            establishmentPostalCode: "75006",
            establishmentCity: "Paris"
        };
        const establishmentDbRowMock: EstablishmentDbRow = {
            establishment_id: "0311713U",
            establishment_name: "Université de Paris",
            establishment_type: "Université",
            establishment_city_name: "Paris",
            establishment_postal_code: "75006"
        };
        const parsedEstablishment = parseEstablishmentsRow(establishmentMock);
        expect(parsedEstablishment).toEqual(establishmentDbRowMock);
    });
});

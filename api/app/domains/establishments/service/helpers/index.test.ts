import { formatSearch } from "@student-sphere-domains/establishments/service/helpers/index";

describe("establishments service helpers", () => {
    test("formatSearch should normalize string and replace accent", () => {
        const value = "éàèù";
        const result = formatSearch(value);
        expect(result).toEqual("eaeu");
    });
});
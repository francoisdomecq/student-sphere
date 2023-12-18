interface EstablishmentDbRow {
    establishment_id: string;
    establishment_name: string;
    establishment_type: string;
    establishment_city_name: string;
    establishment_postal_code: string;
}

interface Establishment {
    establishmentId: string;
    establishmentName: string,
    establishmentType: string,
    establishmentPostalCode: string,
    establishmentCity: string
}

export {
    EstablishmentDbRow,
    Establishment
};

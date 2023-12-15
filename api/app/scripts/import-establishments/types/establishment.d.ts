interface EstablishmentDbRow {
  id: uuid;
  establishment_name: string;
  establishment_type: string;
  establishment_city_name: string;
  establishment_postal_code: string;

}

interface Establishment {
  establishmentName: string,
  establishmentType: string,
  establishmentPostalCode: string,
  establishmentCity: string

}

export {
    EstablishmentDbRow,
    Establishment
};

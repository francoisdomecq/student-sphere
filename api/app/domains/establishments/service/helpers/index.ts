const formatSearch = (searchValue: string | undefined) => {
    if (!searchValue) {
        return undefined;
    }
    const normalizedSearch = searchValue.normalize("NFD");
    // This regex replaces accents by their base letter
    const regex = /[\u0300-\u036f]/g;
    return normalizedSearch.replace(regex, "");
};

export {
    formatSearch
};
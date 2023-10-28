export const handlePrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

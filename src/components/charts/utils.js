export const getHoursArray = () => {
    return Array.from(Array(24), (_, i) => new Date(Date.now() - (i + 1) * 60 * 60 * 1000)).reverse() || [];
};
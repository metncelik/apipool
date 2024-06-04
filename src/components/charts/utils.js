export const getHoursArray = () => {
    const hours = Array.from(Array(24), (_, i) => new Date(Date.now() - (i) * 60 * 60 * 1000).getHours()).reverse() || [];
    return hours;
};
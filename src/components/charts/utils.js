export const getHoursArray = () => {
    const hours = Array.from(Array(24), (_, i) => new Date(Date.now() - (i + 1) * 60 * 60 * 1000).getHours()) || [];
    console.log(hours);
    return hours;
};
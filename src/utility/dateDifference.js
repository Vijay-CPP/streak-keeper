// Utility function to calculate date difference
export const getDateDifference = (start) => {
    if (start === null) {
        return null;
    }

    let startDate = new Date(start.seconds * 1000);
    let endDate = new Date();

    const diffInMilliseconds = Math.abs(endDate - startDate);
    const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
    const remainingSeconds = Math.floor(
        Math.floor(diffInMilliseconds % (24 * 60 * 60 * 1000)) / 1000
    );
    return { days, remainingSeconds };
};
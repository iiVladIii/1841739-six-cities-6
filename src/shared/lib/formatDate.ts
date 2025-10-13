export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dateTime = date.toISOString().split('T')[0];

    return {
        month,
        year,
        dateTime,
        mothYear: `${month} ${year}`,
    };
}

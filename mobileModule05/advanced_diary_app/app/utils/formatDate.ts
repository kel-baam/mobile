export function formatDate(date: string | null) {
    if (!date) return "";
    const newDate = date.split("à")[0];
    return newDate;
}

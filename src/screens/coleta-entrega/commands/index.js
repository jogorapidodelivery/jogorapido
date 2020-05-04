export const hora = (data) => {
    const start = data.indexOf(" ");
    const end = 9;
    return data.substr(start, end);
}
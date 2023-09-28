export const dateFormatting = (date?: Date) => {
    try {
        const dateFormatted = date
            ? date.toLocaleDateString().split('/')
            : new Date().toLocaleDateString().split('/');

        const dateMonth =
            dateFormatted[0].length === 1
                ? (dateFormatted[0] = `0${dateFormatted[0]}`)
                : dateFormatted[0];
        const dateDay =
            dateFormatted[1].length === 1
                ? (dateFormatted[1] = `0${dateFormatted[1]}`)
                : dateFormatted[1];

        const dateMerge = dateFormatted
            ? `${dateFormatted[2]}-${dateMonth}-${dateDay}`
            : undefined;

        return dateMerge;
    } catch (error) {
        throw new Error();
    }
};

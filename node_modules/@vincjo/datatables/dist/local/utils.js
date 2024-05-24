export const isNull = (value) => {
    if (value === null || value === undefined || value === '')
        return true;
    return false;
};
export const isNotNull = (value) => { return !isNull(value); };
export const parseField = (field, uid) => {
    const identifier = uid ?? field.toString();
    if (typeof field === 'string') {
        return {
            callback: (row) => row[field],
            identifier,
            key: field
        };
    }
    else if (typeof field === 'function') {
        return {
            callback: field,
            identifier,
            key: undefined
        };
    }
    throw new Error(`Invalid field argument: ${String(field)}`);
};

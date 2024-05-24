export const check = {
    isLike: (entry, value) => {
        return stringify(entry).indexOf(stringify(value)) > -1;
    },
    isNotLike: (entry, value) => {
        return stringify(entry).indexOf(stringify(value)) === -1;
    },
    startsWith: (entry, value) => {
        return stringify(entry).startsWith(stringify(value));
    },
    endsWith: (entry, value) => {
        return stringify(entry).endsWith(stringify(value));
    },
    isEqualTo: (entry, value) => {
        return stringify(entry) === stringify(value);
    },
    isNotEqualTo: (entry, value) => {
        return stringify(entry) !== stringify(value);
    },
    isGreaterThan: (entry, value) => {
        if (isNull(entry))
            return false;
        return entry > value;
    },
    isGreaterThanOrEqualTo: (entry, value) => {
        if (isNull(entry))
            return false;
        return entry >= value;
    },
    isLessThan: (entry, value) => {
        if (isNull(entry))
            return false;
        return entry < value;
    },
    isLessThanOrEqualTo: (entry, value) => {
        if (isNull(entry))
            return false;
        return entry <= value;
    },
    isBetween: (entry, value) => {
        if (isNull(entry))
            return false;
        const [min, max] = value;
        return entry >= min && entry <= max;
    },
    isStrictlyBetween: (entry, value) => {
        if (isNull(entry))
            return false;
        const [min, max] = value;
        return entry > min && entry < max;
    },
    isTrue: (entry, _) => {
        return entry === true;
    },
    isFalse: (entry, _) => {
        return entry === false;
    },
    isNull: (entry, _) => {
        return entry === null || entry === undefined;
    },
    isNotNull: (entry, _) => {
        return entry === null || entry === undefined ? false : true;
    },
    whereIn: (entry, values = []) => {
        if (isNull(entry))
            return false;
        if (values.length === 0)
            return false;
        for (const { value, comparator } of values) {
            if (comparator(entry, value)) {
                return true;
            }
        }
        return false;
    },
    /**
     * @deprecated use "isLike" instead
     * @since 1.12.7 2023-09-27
     */
    contains: (entry, value) => {
        return check.isLike(entry, value);
    },
};
/* utils */
function stringify(value = null) {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}
function isNull(entry) {
    if (entry === null || entry === undefined)
        return true;
}

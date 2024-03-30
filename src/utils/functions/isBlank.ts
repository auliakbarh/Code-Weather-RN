export function makeString(object: object) {
    if (object == null) return '';
    return '' + object;
};

export function isBlank(str: string) {
    return (/^\s*$/).test(str);
};

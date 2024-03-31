export const numberFormat = (
    number: any,
    dec: number,
    dsep: string,
    tsep: string
) => {
    if (isNaN(number) || number == null) return "";

    number = number.toFixed(~~dec);
    tsep = typeof tsep == "string" ? tsep : ",";

    let parts = number.split("."),
        fnums = parts[0],
        decimals = parts[1] ? (dsep || ".") + parts[1] : "";

    return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + tsep) + decimals;
};

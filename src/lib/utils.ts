/**
 * convert decimal to percentage
 * @param num - number as decimal to convert to percentage
 * @returns {number}
 */
export const decimalToPercentage = (num: number ): number  => {
    return num * 100;
}

/**
 * convert percentage to decimal
 * @param num - number as percentage to convert to decimal
 * @returns {number}
 */
export const percentageToDecimal = (num: number ): number  => {
    return  num / 100;
}

export const formatAsPercentage = (text: string): string => {
    return `${text} %`;
}

export const formatAsCurrency = (value: string, symbol: string): string => {
    return `${symbol}${value}`;
}

export const formatAsDate = (date: Date): string => {
    return `${date.toLocaleDateString()}`;
}

/** Returns non number strings unchanged */
export const formatPrettyFloat = (numStr: string, decimalPlaces: number = 2): string => {
    let parsedNum = parseFloat(numStr);
    if (Number.isNaN(parsedNum)) return numStr;
    return parsedNum.toFixed(decimalPlaces);
}
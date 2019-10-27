export class NumberFormatter {
    public static Format(number: number, maxDecimals?: number, minDecimals?: number, ceil?: boolean): string {
        if (maxDecimals === undefined) {
            maxDecimals = 2;
        }
        if (minDecimals === undefined) {
            minDecimals = maxDecimals;
        }
        if (ceil === undefined) {
            ceil = false;
        }
        const multiplier = Math.pow(10, maxDecimals);
        let roundedNumber;
        if (ceil) {
            number -= 0.0001; // Floating point fix.
            roundedNumber = Math.ceil(number * multiplier) / multiplier;
        } else {
            number += 0.0001; // Floating point fix.
            roundedNumber = Math.floor(number * multiplier) / multiplier;
        }
        if (minDecimals) {
            return roundedNumber.toFixed(minDecimals);
        } else {
            return roundedNumber.toString();
        }
    }
}
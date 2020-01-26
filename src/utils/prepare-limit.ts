import { toNumber, isInteger } from 'lodash';

export const prepareLimit = (count?: string) => {
    const limit = toNumber(count);
    return isInteger(limit) ? limit : undefined;
};

import { pickBy } from 'lodash';
import { prepareSearchSubstring } from './prepare-search-substring';
import { prepareLimit } from './prepare-limit';

type Search = {
    [key: string]: any;
};

export const createSequelizeFindOptions = (search: Search, count?: string) => {
    const key = Object.keys(search)[0];

    const substring = prepareSearchSubstring(search[key]);
    const limit = prepareLimit(count);

    return pickBy({
        where: substring ? { [key]: substring } : {},
        limit,
        raw: true
    });
};

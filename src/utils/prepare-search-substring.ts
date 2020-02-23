import { Op } from 'sequelize';

export const prepareSearchSubstring = (searchSubstring?: string) =>
    searchSubstring ? { [Op.like]: `%${searchSubstring}%` } : undefined;

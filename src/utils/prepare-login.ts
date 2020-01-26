import { Op } from 'sequelize';

export const prepareLogin = (loginSubstring?: string) =>
    loginSubstring ? { [Op.like]: `%${loginSubstring}%` } : undefined;

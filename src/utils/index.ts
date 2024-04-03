import { v4 as uuidv4 } from 'uuid';

export const getUuid = () => uuidv4();

export const getDatetime = () => new Date().toJSON();

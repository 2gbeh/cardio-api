import type { TDocument } from 'src/types/common.type';

export class ControllerHelper {
  static hasQuery = <T>(query?: T) => Object.keys(query as TDocument).length > 0;
}

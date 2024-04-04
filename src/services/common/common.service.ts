import { Injectable } from '@nestjs/common';
import { getUuid, getDatetime } from 'src/utils';
import type { TDocument, TCollection } from 'src/types/common.type';
import { ECommonServiceError as E } from './common.interface';

@Injectable()
export class CommonService {
  private data: unknown[];

  setData<T>(data: T) {
    (this.data as T) = data;
  }

  uniqueFieldsException<A>(obj: A, keys?: string[]) {
    if (keys) {
      let condition = false;
      switch (keys.length) {
        case 2:
          condition =
            this.selectWhere<TDocument, A[]>({
              [keys[0]]: (obj as TDocument)[keys[0]],
            }).length > 0 &&
            this.selectWhere<TDocument, A[]>({
              [keys[1]]: (obj as TDocument)[keys[1]],
            }).length > 0;
          break;
        default:
          condition =
            this.selectWhere<TDocument, A[]>({
              [keys[0]]: (obj as TDocument)[keys[0]],
            }).length > 0;
      }
      //
      if (condition)
        throw new Error(`${E.DUPLICATE_ENTRY} :${keys.join(" :")}`);
    }
  }

  insert<A, R>(createDto: A, uniqueKeys?: string[]): R {
    // check for duplicates
    this.uniqueFieldsException<A>(createDto, uniqueKeys);
    //
    let [id, created_at] = [getUuid(), getDatetime()];
    let obj: unknown = {
      ...createDto,
      created_at,
      id,
    };
    this.data.push(obj);
    //
    return obj as R;
  }

  select<A, R>(param?: A): R {
    if (param) {
      // resource/:resource_id
      let obj = this.data.find((e: TDocument) => e.id == param);
      if (!obj) throw new Error(E.NOT_FOUND);
      return obj as R;
    }
    // resource
    return (this.data ?? []) as R;
  }

  selectWhere<A, R>(query: A): R {
    // resource?q1=:v1&q2=v2
    let key = Object.keys(query as object).pop() as string;
    let arr = this.data.filter(
      (e: TDocument) => e[key] == (query as TDocument)[key],
    );
    return arr as R;
  }

  update<A1, A2, R>(id: A1, updateDto: A2, uniqueKeys?: string[]): R {
    // check id exist
    this.select(id);
    // check for duplicates
    this.uniqueFieldsException<A2>(updateDto, uniqueKeys);
    //
    this.data = this.data.map((e: TDocument) => {
      if (e.id == id) {
        return { ...e, ...updateDto };
      }
      return e;
    });
    //
    return this.select(id) as R;
  }

  delete<A, R>(id: A): R {
    let deletedObject = this.select(id);
    this.data = this.data.filter((e: TDocument) => e.id != id);
    //
    return deletedObject as R;
  }
}

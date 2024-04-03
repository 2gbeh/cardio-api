import { Injectable } from '@nestjs/common';
import { getUuid, getDatetime } from 'src/utils';
import type { TDocument, TCollection } from 'src/types/common.type';

@Injectable()
export class CommonService {
  private data: unknown[];

  setData<T>(data: T) {
    (this.data as T) = data;
  }

  create<A, R>(createDto: A): R {
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

  read<A, R>(param?: A): R {
    if (param) {
      // resource/:resource_id
      let obj = this.data.find((e: TDocument) => e.id == param);
      if (!obj) throw new Error('Not found');
      return obj as R;
    }
    // resource
    return (this.data ?? []) as R;
  }

  update<A1, A2, R>(id: A1, updateDto: A2): R {
    this.data = this.data.map((e: TDocument) => {
      if (e.id == id) {
        return { ...e, ...updateDto };
      }
      return e;
    });
    //
    return this.read(id) as R;
  }

  delete<A, R>(id: A): R {
    let deletedObject = this.read(id);
    this.data = this.data.filter((e: TDocument) => e.id != id);
    //
    return deletedObject as R;
  }
}

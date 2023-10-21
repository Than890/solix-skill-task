import { PageApiQuery } from './constant';
import * as bcrypt from 'bcrypt';

export class Helpers {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static queryOption(query: any, options = {}) {
    let {
      filterObj,
      skipPage,
      takeRows,
      searchKey,
      searchVal,
      sortKey,
      sortVal,
    } = { ...PageApiQuery, ...options };

    filterObj = query?.filter || filterObj;

    skipPage = query?.page?.skip || skipPage;
    takeRows = query?.page?.take || takeRows;

    searchKey = query?.search?.key || searchKey;
    searchVal = query?.search?.value || searchVal;

    sortKey = query?.sort?.key || sortKey;
    sortVal = query?.sort?.value || sortVal;

    return {
      skip: +skipPage,
      take: +takeRows,
      filterObj: filterObj,
      searchKey: searchKey,
      searchVal: searchVal,
      sortKey: sortKey,
      sortVal: sortVal,
    };
  }

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}

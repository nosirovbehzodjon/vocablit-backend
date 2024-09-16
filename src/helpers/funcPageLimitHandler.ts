import { LIMIT, PAGE } from '@/src/constants/common.constant';

export const funcPageLimitHandler = (
  ...rest: [number, number]
): [number, number] => {
  const [page, limit] = rest;

  if (page > 0 && limit > 0) {
    return [page, limit];
  } else if (page > 0) {
    return [page, Number(LIMIT)];
  } else if (limit > 0) {
    return [Number(PAGE), limit];
  } else {
    return [Number(PAGE), Number(LIMIT)];
  }
};

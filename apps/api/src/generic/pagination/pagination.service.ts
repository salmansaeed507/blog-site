import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { CursorPaginationArgs } from '../../cursor-pagination.args';

@Injectable()
export class PaginationService {
  /**
   * Returns pagination data with nextCursor
   * @param query SelectQueryBuilder, final query with all filters applied and order by applied but not limit
   * @param paginationArgs CursorPaginationArgs
   * @param cursorLimitFunc function to be executed for cursor comparison
   * @example
   * function (query, cursor) {
        const date = new Date(Buffer.from(cursor, 'base64').toString('ascii'));
        date.setMilliseconds(date.getMilliseconds() + 1);
        query.andWhere({
          createdAt: MoreThan(date),
        });
    }
   * @param generateCursorFunc function to generate cursor
   * @example
   * function (comment: Comment) {
        return Buffer.from(comment.createdAt.toISOString()).toString('base64');
    }
   * @returns Promise<{ data: T[]; nextCursor: string | null }> which can be mapped to EntityCursorPagination e.g CommentCursorPagination
   */
  async cursorPaginate<T = any>(
    query: SelectQueryBuilder<T>,
    paginationArgs: CursorPaginationArgs,
    cursorLimitFunc: (
      query: SelectQueryBuilder<T>,
      cursor: string | null
    ) => void,
    generateCursorFunc: (data: any) => string
  ): Promise<{ data: T[]; nextCursor: string | null }> {
    let nextCursor: string | null = null;
    query.limit(paginationArgs.count + 1);
    if (paginationArgs.cursor) {
      cursorLimitFunc(query, paginationArgs.cursor);
    }
    const data = await query.getMany();
    if (data.length > paginationArgs.count) {
      nextCursor = generateCursorFunc(data[data.length - 1]);
      data.pop();
    }
    return {
      data,
      nextCursor,
    };
  }
}

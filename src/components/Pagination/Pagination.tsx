/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPaginationRange } from '../../services/getPaginationRange';
import { getSearchWith } from '../../services/searchHelper';
import useWindowDimensions from '../../hooks/useWindowDimensions';

type Props = {
  total: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({ total, perPage }) => {
  const [searchParams] = useSearchParams();
  const { screenWidth } = useWindowDimensions();
  const lastPage = Math.ceil(total / perPage);
  const pageNumber = +(searchParams.get('page') || 1);
  const pages = getPaginationRange(lastPage, pageNumber, 1, screenWidth);

  const handlePageChande = (mode: string) => {
    if (mode === 'prev' && pageNumber > 1) {
      return getSearchWith({ page: `${pageNumber - 1}` }, searchParams);
    }

    if (mode === 'next' && pageNumber < total) {
      return getSearchWith({ page: `${pageNumber + 1}` }, searchParams);
    }

    if (mode === '... ') {
      return getSearchWith({ page: '3' }, searchParams);
    }

    if (mode === ' ...') {
      return getSearchWith({ page: `${lastPage - 3}` }, searchParams);
    }

    return getSearchWith({ page: mode }, searchParams);
  };

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <Link
          data-cy="prevLink"
          className={classNames(
            'pagination__link',
            'pagination__link--arrow',
            pageNumber === 1 ? 'pagination__link--arrow-disabled' : '',
          )}
          to={{ search: handlePageChande('prev') }}
        />
      </li>
      {pages.map(p => {
        const isSelected = pageNumber === +p;

        return (
          <li
            className={classNames(
              'pagination__item',
              isSelected ? 'active' : '',
            )}
            key={p}
          >
            <Link
              data-cy="pageLink"
              className={classNames(
                'pagination__link',
                isSelected ? 'pagination__link--active' : '',
              )}
              to={{
                search: handlePageChande(p),
              }}
            >
              {p}
            </Link>
          </li>
        );
      })}
      <li className="pagination__item">
        <Link
          data-cy="nextLink"
          className={classNames(
            'pagination__link',
            'pagination__link--arrow',
            'pagination__link--arrow-right',
            pageNumber === lastPage ? 'pagination__link--arrow-disabled' : '',
          )}
          to={{ search: handlePageChande('next') }}
        />
      </li>
    </ul>
  );
};

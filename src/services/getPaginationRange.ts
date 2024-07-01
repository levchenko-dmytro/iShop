function getNumbers(from: number, to: number): string[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(`${n}`);
  }

  return numbers;
}

export function getPaginationRange(
  totalPages: number,
  page: number,
  siblings: number,
  screenWidth: number,
): string[] {
  if (screenWidth < 640) {
    if (page > 1) {
      const lastPage = Math.min(page + 2, totalPages);

      return getNumbers(page - 1, lastPage);
    }

    return getNumbers(page, page + 3);
  }

  const totalPageNumber = 7 + siblings;

  if (totalPageNumber >= totalPages) {
    return getNumbers(1, totalPages);
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rigthSiblingsIndex = Math.min(page + siblings, totalPages);
  const showLeftDots = leftSiblingsIndex > 2;
  const showRigthDots = rigthSiblingsIndex < totalPages - 2;

  if (!showLeftDots && showRigthDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = getNumbers(1, leftItemsCount);

    return [...leftRange, ' ...', `${totalPages}`];
  } else if (showLeftDots && !showRigthDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = getNumbers(totalPages - rightItemsCount + 1, totalPages);

    return ['1', '... ', ...rightRange];
  } else {
    const middleRange = getNumbers(leftSiblingsIndex, rigthSiblingsIndex);

    return ['1', '... ', ...middleRange, ' ...', `${totalPages}`];
  }
}

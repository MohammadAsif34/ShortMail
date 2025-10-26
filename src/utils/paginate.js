export const paginate = (data = [], page = 1, pp = 25) => {
  const size = data.length;
  const totalPage = Math.ceil(size / pp);

  const start = (page - 1) * pp;
  const end = Math.min(start + pp, size);

  const pageData = data.slice(start, end);

  return { pageData, start, end, totalPage };
};

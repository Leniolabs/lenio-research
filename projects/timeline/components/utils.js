export const getCompaniesOptions = (companies) => [
  { label: "All", key: "all" },
  ...companies.map(({ company }, index) => ({ label: company, value: index }))
];

export const getCompanyIndex = (selectedCompany, companies) => {
  return companies.findIndex(({ company }) => company === selectedCompany) || 0;
};

export const getPublicationDates = (companyPublications) =>
  companyPublications.map((item) => {
    return item.dateAt;
  });

export const getAllPublications = (data = []) => {
  let allPublications = [];
  data.forEach(({ company, publications }) => {
    allPublications.push(...publications.map((pub) => ({ ...pub, company })));
  });
  return allPublications
    .sort((a, b) => new Date(a.dateAt) - new Date(b.dateAt))
    .map((pub, index) => ({ ...pub, id: index + 1 }));
};

export const mapDatesToGraphic = (dates) => {
  const dateKeys = Object.keys(dates);
  let newArray = [];
  dateKeys.forEach((item) => {
    const newList = dates[item].map((date) => ({ date, status: item }));
    newArray = [...newArray, ...newList];
  });
  return newArray;
};

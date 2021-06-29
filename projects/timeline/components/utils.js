import dayjs from "dayjs";

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

export const getLineGraphicDates = (data = []) => {
  let lineGraphicDates = [];
  data.forEach(({ publications }) => {
    lineGraphicDates.push(
      ...publications.map((pub) => {
        const { calendar } = pub;
        return calendar;
      })
    );
  });
  return lineGraphicDates;
};

export const mapDatesToGraphic = (dates = {}) => {
  const dateKeys = Object.keys(dates);
  let newArray = [];
  dateKeys.forEach((item) => {
    const newList = dates[item].map((date) => ({ date: dayjs(date).format(), status: item }));
    newArray = [...newArray, ...newList];
  });
  return newArray.sort((a, b) => new Date(a.date) - new Date(b.date));
};

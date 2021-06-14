export const getCompaniesOptions = (companies) =>
  companies.map(({ company }, index) => ({ label: company, value: index }));

export const getCompanyIndex = (selectedCompany, companies) => {
  return companies.findIndex(({ company }) => company === selectedCompany) || 0;
};

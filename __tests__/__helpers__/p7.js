
const companies = [
  { id: 1, name: 'fox' },
  { id: 3, name: 'cloak and stagger' },
  { id: 2, name: 'cia' },
];

const status = { time: new Date().toISOString(), ok: true };

const users = [
  { name: 'fran', companyId: 3 },
  { name: 'stan', companyId: 2 },
  { name: 'steve', companyId: 1 },
];

const services = {
  fetchStatus: () => new Promise(resolve => setTimeout(() => resolve(status), 110)),
  fetchUsers: () => new Promise(resolve => setTimeout(() => resolve(users), 100)),
  fetchCompanyById: companyId =>
    new Promise(resolve =>
      setTimeout(() => resolve(companies.find(({ id }) => id === companyId)), 50)),
};

module.exports = {
  companies,
  status,
  users,
  services,
};

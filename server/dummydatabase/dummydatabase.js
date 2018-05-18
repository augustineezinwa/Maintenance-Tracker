const requests = [{
  id: 1,
  requestTitle: 'Faulty TV',
  resolved: 'success',
  approved: 'fail',
  rejected: 'fail',
  message: 'My tv is faulty, Come check it out',
  userId: 1
}];

const users = [{
  id: 1,
  firstName: 'Augustine',
  lastName: 'Ezinwa',
  email: 'aj@yahoo.com',
  password: 'fisher',
  requests: [],
}];

export { users, requests };

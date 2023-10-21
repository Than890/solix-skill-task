export const PageApiQuery = {
  filterObj: {},
  skipPage: 0,
  takeRows: 10,
  searchKey: 'name',
  searchVal: '',
  sortKey: 'updated_at',
  sortVal: 'desc',
};

export const ValidationMessage = {
  default: 'value does not match in the system.',
  username: 'username must only contain letters, numbers, and underscores',
  password:
    'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
};

export const REQUIRE_ADMIN_LAB_SIGN_UP_FIELDS = [
  'fullname',
  'birthday',
  'IDNumber',
  'IDCardNumber',
  'username',
  'password',
  'phone',
  'email',
  'university',
  'gender',
  'job'
];

export const REQUIRE_LAB_SIGN_UP_FIELDS = [
  'name',
  'address',
  'university',
  'specialize'
  // 'confirmFile'
];

export const REQUIRE_MEMBER_SIGN_UP_FIELDS = [
  'username',
  'password',
  'fullname',
  'email',
  'IDCardNumber',
  'gender'
];

export const REQUIRE_USER_GET_PROFILE_FIELDS = [
  'avatarImage',
  'avatarId',
  'gender',
  'fullname',
  'phone',
  'email',
  'IDCardNumber',
  'IDNumber',
  'university',
  'job'
];

export const REQUIRE_USER_UPDATE_PROFILE_FIELDS = [
  ...REQUIRE_USER_GET_PROFILE_FIELDS,
  'password'
];

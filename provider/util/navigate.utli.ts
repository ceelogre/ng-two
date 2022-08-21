import {EUserRole} from './../enum/user-role.enum';

// Method that handle routing route to default routes
export const navigationHandler = (role: EUserRole): string => {
  switch (true) {
    case role === EUserRole.ADMIN:
      return '/users';
    case role === EUserRole.SUPER_ADMIN:
      return '/users';
    case role === EUserRole.VALUER:
      return '/inspections';
    case role === EUserRole.BAILIFF:
      return '/credits';
    default:
      return '/auth';
  }
}

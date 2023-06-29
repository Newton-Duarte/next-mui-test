type User = {
  permissions: string[];
  is_admin: boolean;
};

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
};

export function validateUserPermissions({
  user,
  permissions = [],
}: ValidateUserPermissionsParams) {
  if (user.is_admin) return true;

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  return true;
}

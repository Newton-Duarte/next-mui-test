export function getUserAvailablePages(userPermissions: string[] = []) {
  return userPermissions
    .filter((permission) => permission.includes('_read'))
    .map((permission) => permission.split('_')[0]);
}

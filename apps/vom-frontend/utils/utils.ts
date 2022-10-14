
export const getUserRole = () => {
    let json = JSON.parse(localStorage.getItem(process.env.authUser));
    return json.role;
}

export enum UserRoles {
    'SUPER_ADMIN' = 'super',
    'AFFLIATE' = 'affliate',
    'ADMIN' = 'admin',
    'GROUP_MANAGER' = 'group_manager',
    'EMPLOYEE' = 'employee',
}
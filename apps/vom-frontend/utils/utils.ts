
export const getUserRole = () => {

    let json = localStorage.getItem(process.env.authUser) ? JSON.parse(localStorage.getItem(process.env.authUser)) : null;
    return (json && json.role) ? json.role : null;
}

export enum UserRoles {
    'SUPER_ADMIN' = 'super',
    'AFFLIATE' = 'affliate',
    'ADMIN' = 'admin',
    'GROUP_MANAGER' = 'group_manager',
    'EMPLOYEE' = 'employee',
}
export const users = [
    {
        id: 1,
        username: 'admin',
        email: 'vishant@gmail.com',
        status: 'active',
        roles: ['admin'],
    },
    {
        id: 2,
        username: 'user1',
        email: 'ivleague51@gmail.com',
        status: 'active',
        roles: ['user'],
    },
];

export const roles = [
    {
        id: 1,
        name: 'admin',
        permissions: ['users.read', 'users.write', 'users.delete', 'roles.read', 'roles.write', 'roles.delete'],
    },
    {
        id: 2,
        name: 'user',
        permissions: ['users.read', 'roles.read'],
    },
];

export const permissions = [
    { id: 1, name: 'users.read', description: 'View users' },
    { id: 2, name: 'users.write', description: 'Create/Edit users' },
    { id: 3, name: 'users.delete', description: 'Delete users' },
    { id: 4, name: 'roles.read', description: 'View roles' },
    { id: 5, name: 'roles.write', description: 'Create/Edit roles' },
    { id: 6, name: 'roles.delete', description: 'Delete roles' },
]; 
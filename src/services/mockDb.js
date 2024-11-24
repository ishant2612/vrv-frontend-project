const db = {
    users: [


    ],

    roles: [
        {
            id: 1,
            name: 'admin',
            description: 'Full system access',
            permissions: ['users.*', 'roles.*', 'settings.*'],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
            id: 2,
            name: 'manager',
            description: 'Department management access',
            permissions: ['users.read', 'users.write', 'roles.read'],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
            id: 3,
            name: 'user',
            description: 'Basic user access',
            permissions: ['users.read'],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
        },
    ],

    permissions: [
        { id: 1, name: 'users.read', description: 'View users', category: 'Users' },
        { id: 2, name: 'users.write', description: 'Create/Edit users', category: 'Users' },
        { id: 3, name: 'users.delete', description: 'Delete users', category: 'Users' },
        { id: 4, name: 'roles.read', description: 'View roles', category: 'Roles' },
        { id: 5, name: 'roles.write', description: 'Create/Edit roles', category: 'Roles' },
        { id: 6, name: 'roles.delete', description: 'Delete roles', category: 'Roles' },
        { id: 7, name: 'settings.*', description: 'Manage system settings', category: 'Settings' },
    ],

    // Helper methods for data manipulation
    findUser: function (id) {
        return this.users.find(user => user.id === id);
    },

    findRole: function (id) {
        return this.roles.find(role => role.id === id);
    },

    addUser: function (userData) {
        const newUser = {
            ...userData,
            id: this.users.length + 1,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            avatar: null,
        };
        this.users.push(newUser);
        return newUser;
    },

    updateUser: function (id, data) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...data };
            return this.users[index];
        }
        return null;
    },

    deleteUser: function (id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    },

    // Similar methods for roles
    addRole: function (role) {
        const newRole = {
            ...role,
            id: this.roles.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.roles.push(newRole);
        return newRole;
    },

    updateRole: function (id, data) {
        const index = this.roles.findIndex(role => role.id === id);
        if (index !== -1) {
            this.roles[index] = {
                ...this.roles[index],
                ...data,
                updatedAt: new Date().toISOString(),
            };
            return this.roles[index];
        }
        return null;
    },

    deleteRole: function (id) {
        const index = this.roles.findIndex(role => role.id === id);
        if (index !== -1) {
            this.roles.splice(index, 1);
            return true;
        }
        return false;
    },
};

export default db; 
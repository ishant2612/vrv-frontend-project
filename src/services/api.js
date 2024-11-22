import db from './mockDb';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Event listeners for real-time updates
const listeners = new Set();

const notifyListeners = (type, data) => {
    listeners.forEach(listener => listener(type, data));
};

const withCache = async (key, fetchFn) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    const data = await fetchFn();
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
    return data;
};

// Export the api object
const api = {
    // Subscribe to real-time updates
    subscribe: (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },

    // Users
    getUsers: async () => {
        return withCache('users', async () => {
            await delay(500);
            return [...db.users];
        });
    },

    createUser: async (userData) => {
        await delay(500);
        // Check if user already exists
        const existingUser = db.users.find(user => user.email === userData.email);
        if (existingUser) {
            return existingUser;
        }
        const newUser = db.addUser(userData);
        cache.delete('users'); // Invalidate cache
        notifyListeners('user_created', newUser);

        // Update local storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return newUser;
    },

    updateUser: async (id, userData) => {
        await delay(500);
        const result = db.updateUser(id, userData);
        if (!result) throw new Error('User not found');
        cache.delete('users'); // Invalidate cache
        notifyListeners('user_updated', result);

        // Update local storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = result;
            localStorage.setItem('users', JSON.stringify(users));
        }

        return result;
    },

    deleteUser: async (id) => {
        await delay(500);
        const result = db.deleteUser(id);
        if (!result) throw new Error('User not found');
        cache.delete('users'); // Invalidate cache
        notifyListeners('user_deleted', id);

        // Update local storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const filteredUsers = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(filteredUsers));

        return true;
    },

    // Roles
    getRoles: async () => {
        return withCache('roles', async () => {
            await delay(500);
            return [...db.roles];
        });
    },

    getPermissions: async () => {
        return withCache('permissions', async () => {
            await delay(500);
            return [...db.permissions];
        });
    },

    createRole: async (roleData) => {
        await delay(500);
        const newRole = db.addRole(roleData);
        cache.delete('roles'); // Invalidate cache
        notifyListeners('role_created', newRole);

        // Update local storage
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        roles.push(newRole);
        localStorage.setItem('roles', JSON.stringify(roles));

        return newRole;
    },

    updateRole: async (id, roleData) => {
        await delay(500);
        const result = db.updateRole(id, roleData);
        if (!result) throw new Error('Role not found');
        cache.delete('roles'); // Invalidate cache
        notifyListeners('role_updated', result);

        // Update local storage
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        const index = roles.findIndex(role => role.id === id);
        if (index !== -1) {
            roles[index] = result;
            localStorage.setItem('roles', JSON.stringify(roles));
        }

        return result;
    },

    deleteRole: async (id) => {
        await delay(500);
        const result = db.deleteRole(id);
        if (!result) throw new Error('Role not found');
        cache.delete('roles'); // Invalidate cache
        notifyListeners('role_deleted', id);

        // Update local storage
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        const filteredRoles = roles.filter(role => role.id !== id);
        localStorage.setItem('roles', JSON.stringify(filteredRoles));

        return true;
    },

    getUserByEmail: async (email) => {
        await delay(500);
        return db.users.find(user => user.email === email) || null;
    },

    // Initialize the database from localStorage on app start
    initializeFromStorage: () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');

        if (users.length > 0) {
            db.users = users;
        }
        if (roles.length > 0) {
            db.roles = roles;
        }
    },
};

// Initialize from localStorage when the module loads
api.initializeFromStorage();

export { api }; 
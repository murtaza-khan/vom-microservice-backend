import { AuthProvider } from "react-admin";
import { dataProvider } from "./dataProvider";

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {

        const { data } = await dataProvider.login({ email: username, password: password });

        localStorage.setItem(process.env.authUser, JSON.stringify(data));
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem(process.env.authUser);
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem(process.env.authUser)
            ? Promise.resolve()
            : Promise.reject();
    },
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem(process.env.authUser);
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    // getIdentity: () =>
    //     Promise.resolve({
    //         id: 'user',
    //         fullName: 'John Doe',
    //     }),
    getPermissions: () => Promise.resolve(''),
};

export default authProvider;

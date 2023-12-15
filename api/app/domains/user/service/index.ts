import { findAllUsers } from "../data-access";

const getAllUsers = async () => {
    return findAllUsers();
};

export {
    getAllUsers
};

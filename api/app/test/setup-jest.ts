import "reflect-metadata";

// mock database setup
jest.mock("@student-sphere-infrastructure/database", () => {
    return {};
});

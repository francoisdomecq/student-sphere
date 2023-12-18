import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json";

const jestConfig: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: [ "ts", "js" ],
    coverageReporters: [ "text", "cobertura", "lcov", "html" ],
    reporters: [ "default", "jest-junit" ],
    roots: [ "app" ],
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" }),
    setupFilesAfterEnv: [ "./app/test/setup-jest.ts" ]
};
export default jestConfig;

import packageJson from "package.json";

export const getAppVersion = () => packageJson?.version;

export const getEnv = (envName) => {
  return import.meta.env[envName];
};

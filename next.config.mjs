// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
const config = async () => {
  await import("./src/env.mjs");

  return {
    reactStrictMode: true,
    redirects() {
      return [
        {
          source: "/",
          destination: "/instruments",
          permanent: true,
        },
      ];
    },
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
  };
};

export default config;

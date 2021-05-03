module.exports = ({ env }) => {
  /**
   * Checks the NODE_ENV variable.
   * If it is test, then use separate test-database.
   * Else, use the ordinary database
   */
  if (process.env.NODE_ENV === 'test') {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'mongoose',
          settings: {
            host: env('DATABASE_HOST', '@cluster0.6ihqu.mongodb.net'),
            srv: env.bool('DATABASE_SRV', true),
            port: env.int('DATABASE_PORT', 27017),
            database: env('DATABASE_NAME', 'pu_webapp_test'),
            username: env('DATABASE_USERNAME', 'pu_strapi_test'),
            password: env('DATABASE_PASSWORD', 'pupassordtest'),
          },
          options: {
            authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
            ssl: env.bool('DATABASE_SSL', true),
          },
        },
      },
    }
  } else {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'mongoose',
          settings: {
            host: env('DATABASE_HOST', '@cluster0.6ihqu.mongodb.net'),
            srv: env.bool('DATABASE_SRV', true),
            port: env.int('DATABASE_PORT', 27017),
            database: env('DATABASE_NAME', 'pu_webapp'),
            username: env('DATABASE_USERNAME', 'pu_strapi'),
            password: env('DATABASE_PASSWORD', 'pupassord'),
          },
          options: {
            authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
            ssl: env.bool('DATABASE_SSL', true),
          },
        },
      },
    }
  }
};

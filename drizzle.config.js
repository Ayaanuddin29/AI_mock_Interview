/** @type {import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",  
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://AI-mock_owner:npg_1nejym8bOhKz@ep-wispy-recipe-a86yc3eq-pooler.eastus2.azure.neon.tech/AI-mock?sslmode=require"
    }
  };
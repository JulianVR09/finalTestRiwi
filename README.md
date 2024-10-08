<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Final Test NestJS Project

## Description
This is a NestJS project with TypeORM integration, JWT authentication, and Swagger documentation.

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MySQL database

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Available Scripts

- `build` - Builds the application
- `format` - Formats the code using Prettier
- `start` - Starts the application
- `start:dev` - Starts the application in watch mode
- `start:debug` - Starts the application in debug mode
- `start:prod` - Starts the application in production mode
- `lint` - Lints and fixes files
- `test` - Runs unit tests
- `test:watch` - Runs unit tests in watch mode
- `test:cov` - Runs test coverage
- `test:debug` - Runs tests in debug mode
- `test:e2e` - Runs end-to-end tests

## Project Structure

The project uses a standard NestJS structure with the following key dependencies:

- `@nestjs/common`, `@nestjs/core` - Core NestJS framework
- `@nestjs/config` - Configuration management
- `@nestjs/jwt` - JWT authentication
- `@nestjs/swagger` - API documentation
- `@nestjs/typeorm` - TypeORM integration
- `bcrypt` - Password hashing
- `class-validator`, `class-transformer` - DTO validation and transformation
- `mysql2` - MySQL database driver

## Development Dependencies

Key development dependencies include:

- `@nestjs/testing` - Testing utilities
- `jest` - Testing framework
- `typescript` - TypeScript compiler
- Various ESLint and Prettier configurations for code formatting

## Testing Configuration

The project uses Jest for testing with the following configuration:

- Test files should have the `.spec.ts` extension
- Coverage reports are generated in the `coverage` directory
- Tests run in a Node.js environment

## Additional Notes

- The project includes Swagger UI for API documentation
- Authentication is handled using JWT (JSON Web Tokens)
- Database interactions are managed through TypeORM
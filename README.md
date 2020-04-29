# Protected Characteristics Questionnaire

This is the frontend for the protected characteristics questionnaire service. This service will ask a set of questions that will help us check we are treating people fairly and equally. It helps us to meet our commitment to equality (under the Equality Act 2010). 

## Getting Started

### Prerequisites

- [Node.js](nodejs.org) >= 8.9.0
- [yarn](yarnpkg.com)

### Installation

Install dependencies by executing the following command:

```
$ yarn install
```

Sass:

```
$ yarn setup
```

Git hooks:

We have git hooks that enforce rules for commit messages.

These can be activated by running the following commands:

```
$ ln -s ../../pre-commit.sh .git/hooks/pre-commit
$ ln -s ../../commit-msg.sh .git/hooks/commit-msg
```

### Running the application

Run the application local server:

```
$ yarn start
```

Open [https://localhost:4000](https://localhost:4000) in a browser

## Developing

### Code style

Before submitting a Pull Request you will be required to run:
`$ yarn eslint`

We have a number of rules relating to code style that can be found in [.eslintrc.js](.eslintrc.js).

### Config

For development only config, use the `dev.yaml` file. Running the app with the node environment set to `dev` will ensure this file is used.
This file is not version controlled so any config here will not be pushed to git.

As an example, if you want to use LanuchDarkly locally, place the SDK Key in this file. You can keep the key there as this file is not version controlled.

### Running the tests

Mocha is used for writing tests.

The test suite can be run with:
`$ yarn test`

For unit tests:
`$ yarn test-unit`

For component tests:
`$ yarn test-component`

For accessibility tests:
`$ yarn test-accessibility`

For test coverage:
`$ yarn test-coverage`

## Registering a service with PCQ

When your service has got approval and is ready to integrate with PCQ 
you will firstly need to add your service to the [registered service JSON file](app/registeredServices.json).
Add a new object to the array with your service id and list of actors. 

There are 3 pages which require specific wording regarding your service. 
Please see the [README](app/resources/en/translation/variable/README.md) for adding your services text.

If there are questions you want to be excluded from the questionnaire because they are irrelevant (such as asking someone if they are married when coming from the divorce app), 
please see the [README](app/journeys/README.md) for creating a service specific journey.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

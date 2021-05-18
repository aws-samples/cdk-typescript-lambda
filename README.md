# How to set up TypeScript CDK project with Lambda functions developed using TypeScript

AWS CDK supports TypeScript as a client language. There are examples available in AWS documentation on how to set up CDK project using TypeScript to deploy NodeJS based Lambda functions. Lambda functions in these examples are written in JavaScript. 

Project teams might want to keep one language for entire code base, so if they are using TypeScript for CDK, they'd most likely want to use TypeScript for undelying Lambda functions also. This artifact provides the example for this. 

This code repository can be used as a starting point for TypeScript CDK projects, with Lambda functions written in TypeScript. Here's everything included in this repository - 

* Two sample Lambda functions to show a way to organize project structure, specify compiled JS file location, and specify location of compiled code for CDK to deploy for each Lambda function.
* Build script to build all Lambda functions with one command.
* Jest configuration to run unit test cases for CDK stack as well as all Lambda functions with one command.
* Project level configuration for prettier and ESLint.
* Config to generate environment specific names for cloud resources. For example, if ENV_NAME is set to `test`, `Add` function's name would be  `Add_test`

Code Repository - https://gitlab.aws.dev/jaivai/cdk-ts-lambda

## Project Setup

The project has two Lambda functions - Add and Multiply for demonstration. They are located in /src folder. The build script generates JS files and copies node_modules with only production dependencies to src/{LAMBDA_DIRCTORY}/lib. This directory is specifed as `assetsPath` in lib/cdk-ts-lambda-stack.ts.

The `cdk.json` file tells the CDK Toolkit how to execute this app.

`lib/cdk-ts-lambda-stack` defines the stack. The stack contains two Lambda functions - Add and Multiply.

`lib/config.ts` defines different configurations needed to build the stack. The configurations can  be passed as environment variables or default values will be used. For each configuration, there is an accessor function that contains logic on whether the value should be returned directly or if it should have a post fix of _{ENV_NAME}.

Individual Lambda functions are in `src` folder. Each Lambda project is set up as an independent NodeJS project. 

`src/{LAMBDA_NAME}` contains individual Lambda code. TypeScript files are compiled in `/lib` directory. `package.json` file in each Lambda project contains thress scripts -

* `prebuild` - Runs `npm install` before build
* `build` - Compiles TyeScript code in `/lib` directory.
* `package` - Updates `node_modules` directory to remove all dev dependencies and then copies the updated `node_modules` to `/lib`

After `package` runs, `/lib` will have the JS files and dependencies needed to publish Lambda function to AWS.

Unit tests for the CDK stack are in `__tests__` directory and for individual Lamda's test cases are in `/src/{LAMBDA_NAME}/__tests__`

### Configurations

* **ESLint** : ESLint configuration is in the root directory. The lambda project package.json refers to this file in lint command. run npm run lint from root.

* **Prettier** :  Prettier configurations are also on root directory. Run npm run format from root directory

* **Typescript** : Typescript config (tsconfig.json) are at both Lambda and CDK project levels.

* **Jest** : jest.config is only at root project as the test will only be executed from root directory.


## Steps to set up

### Prerequisites

1.	Access to an AWS account using both AWS Console and AWS CLI V2. Instructions to configure AWS CLI V2 are available [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).
2.	AWS CDK is setup. The instructions are available [here](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install). 
3.	NodeJS is installed. Download latest version from [here](https://nodejs.org/en/download/).
4.	Git is installed (to pull code from repository). The instructions are available [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
5.	Access to AWS Gitlab - https://gitlab.aws.dev/ and HTTPS credentials or SSH key is set up. Instructions to set up SSH key are available [here](https://gitlab.aws.dev/help/ssh/README#generate-an-ssh-key-pair).
6.	VS Code or any other IDE for TypeScript development.
7.	If using windows, use git-bash as terminal. It’s installed as part of installing Git.



### Install and Deploy 
From project root directory, run following commands - 
* `npm install`
* `npm run build`
* `export ENV_NAME=test` - This sets the environment name to `test`, so the resources will have post-fix of `_test` in their name.
* `npm run test`
* `cdk deploy`


## Useful commands

### Customized Commands
 * `npm run build`   Builds CDK TypeScript, all Lambda functions under /src and updates each functions /lib directory with node_modules
 * `npm run lint`    runs ESLint validation on entire project, including all Lambda applications
 * `npm run format`  runs Prettier to format all TypeScript code - CDK and Lambda applications.
 * `npm run test`    perform the jest unit tests for CDK stack and all Lambda functions. The coverage information will be generated in `coverage` directory.

### Commands available out of box with CDK.
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

### References

[AWS CDK Developer Guide](https://docs.aws.amazon.com/cdk/latest/guide/home.html)

[Creating a serverless application using the AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html)

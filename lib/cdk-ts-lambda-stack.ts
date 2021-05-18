/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as cdk from "@aws-cdk/core";
import { Tags } from "@aws-cdk/core";
import { Lambda, LambdaProps } from "../constructs/Lambda";
import { Config } from "./config";

export class CdkTsLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    if (process.env.ENV_NAME) {
      super(scope, id, props);

      const config = new Config();

      this.addAdditionFunction(config);
      this.addMultiplicationFunction(config);

      Tags.of(this).add("APP_NAME", "CDK_SAMPLE");
      Tags.of(this).add("ENVIRONMENT", process.env.ENV_NAME);
    } else {
      throw new Error("ENV_NAME environment variable is mandatory.");
    }
  }

  private addAdditionFunction(config: Config) {
    const lambdaProps: LambdaProps = {
      handler: "index.handler",
      assetsPath: "src/Add/lib",
      functionName: config.getadditionFuncName(),
      functionRoleDesc: config.getadditionFuncRoleDesc(),
      functionRoleName: config.getadditionFuncRoleName(),
    };

    new Lambda(this, config.getadditionFuncName(), lambdaProps);
  }

  private addMultiplicationFunction(config: Config) {
    const lambdaProps: LambdaProps = {
      handler: "index.handler",
      assetsPath: "src/Multiply/lib",
      functionName: config.getmultiplyFuncName(),
      functionRoleDesc: config.getmultiplyFuncRoleDesc(),
      functionRoleName: config.getmultiplyFuncRoleName(),
    };

    new Lambda(this, config.getmultiplyFuncName(), lambdaProps);
  }
}

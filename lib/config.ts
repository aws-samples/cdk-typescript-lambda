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

export class Config {
  private account: string | undefined;
  private region: string | undefined;

  private additionFuncRoleName: string;
  private additionFuncRoleDesc: string;
  private additionFuncName: string;

  private multiplyFuncRoleName: string;
  private multiplyFuncRoleDesc: string;
  private multiplyFuncName: string;

  private defaults = {
    additionFuncRoleName: "add-role",
    additionFuncRoleDesc: "Role for addition Function",
    additionFuncName: "add",

    multiplyFuncRoleName: "multiply-role",
    multiplyFuncRoleDesc: "Role for multiply function",
    multiplyFuncName: "multiply",
  };

  constructor() {
    this.account =
      process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;
    this.region =
      process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION;

    this.additionFuncRoleName =
      process.env.ADDITION_FUNC_ROLE_NAME || this.defaults.additionFuncRoleName;
    this.additionFuncRoleDesc =
      process.env.ADDITION_FUNC_ROLE_DESC || this.defaults.additionFuncRoleDesc;
    this.additionFuncName =
      process.env.ADDITION_FUNC_NAME || this.defaults.additionFuncName;

    this.multiplyFuncRoleName =
      process.env.MULTIPLY_FUNC_ROLE_NAME || this.defaults.multiplyFuncRoleName;
    this.multiplyFuncRoleDesc =
      process.env.MULTIPLY_FUNC_ROLE_DESC || this.defaults.multiplyFuncRoleDesc;
    this.multiplyFuncName =
      process.env.MULTIPLY_FUNC_NAME || this.defaults.multiplyFuncName;
  }

  getAccount(): string | undefined {
    return this.account;
  }
  getRegion(): string | undefined {
    return this.region;
  }

  getadditionFuncRoleName(): string {
    return this.getValWithEnv(this.additionFuncRoleName);
  }
  getadditionFuncRoleDesc(): string {
    return this.additionFuncRoleDesc;
  }
  getadditionFuncName(): string {
    return this.getValWithEnv(this.additionFuncName);
  }

  getmultiplyFuncRoleName(): string {
    return this.getValWithEnv(this.multiplyFuncRoleName);
  }
  getmultiplyFuncRoleDesc(): string {
    return this.multiplyFuncRoleDesc;
  }
  getmultiplyFuncName(): string {
    return this.getValWithEnv(this.multiplyFuncName);
  }

  private getValWithEnv(val: string): string {
    return val + "-" + process.env.ENV_NAME;
  }
}

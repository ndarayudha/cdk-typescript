import { Construct } from "constructs";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";

const pathProductLambdas = join(__dirname, '..', 'lambdas');
const pathPackageLockJson = join(__dirname, '..', "package-lock.json");

export class ProductConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const dynamoTable = new Table(this, "items", {
      partitionKey: {
        name: "itemId",
        type: AttributeType.STRING,
      },
      tableName: "items",
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      depsLockFilePath: pathPackageLockJson,
      environment: {
        PRIMARY_KEY: "itemId",
        TABLE_NAME: dynamoTable.tableName,
      },
      runtime: Runtime.NODEJS_16_X,
    };

    // Create a Lambda function for each of the CRUD operations
    new NodejsFunction(this, "getOneItemFunction", {
      entry: join(pathProductLambdas, "get-one.ts"),
      ...nodeJsFunctionProps,
    });
    new NodejsFunction(this, "getAllItemsFunction", {
      entry: join(pathProductLambdas, "get-all.ts"),
      ...nodeJsFunctionProps,
    });
    new NodejsFunction(this, "createItemFunction", {
      entry: join(pathProductLambdas, "create.ts"),
      ...nodeJsFunctionProps,
    });
    new NodejsFunction(this, "updateItemFunction", {
      entry: join(pathProductLambdas, "update-one.ts"),
      ...nodeJsFunctionProps,
    });
    new NodejsFunction(this, "deleteItemFunction", {
      entry: join(pathProductLambdas, "delete-one.ts"),
      ...nodeJsFunctionProps,
    });
  }
}

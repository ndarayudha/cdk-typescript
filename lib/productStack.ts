import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ProductConstruct } from "../packages/product/lib/product-construct";

export class ProductStack extends Stack {
  constructor(construct: Construct, id: string) {
    super(construct, id);

    new ProductConstruct(this, 'ProductConstruct');
  }
}

#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductStack } from './lib/productStack';


const app = new cdk.App();
new ProductStack(app, 'ProductStack');

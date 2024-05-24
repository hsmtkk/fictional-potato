import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as elasticloadbalancing from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class FictionalPotatoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'vpc', {
      availabilityZones: ["ap-northeast-1c", "ap-northeast-1d"],
    });

    const securityGroup = new ec2.SecurityGroup(this, 'securityGroup', {
      vpc: vpc,
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));

    const alb = new elasticloadbalancing.ApplicationLoadBalancer(this, 'alb', {
      vpc: vpc,
      internetFacing: true,
      securityGroup: securityGroup,
    });

    const cluster = new ecs.Cluster(this, 'cluster', {
      vpc: vpc,
    });

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'service', {
      cluster: cluster,
      loadBalancer: alb,
      taskImageOptions: {
        containerPort: 80,
        image: ecs.ContainerImage.fromAsset("./app"),
      },
      taskSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      }
    });
  }
}

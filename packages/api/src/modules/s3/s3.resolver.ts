import { Inject } from "typedi"
import { Arg, Resolver, Mutation } from "type-graphql"
import { S3SignedUrlInput } from "./inputs/s3SignedUrl.input"
import { S3Service } from "./s3.service"
import { S3BulkSignedUrlInput } from "./inputs/s3BulkSignedUrl.input"
import { BulkSignedResponse } from "./response/bulkSigned.response"

@Resolver()
export class S3Resolver {
  @Inject(() => S3Service)
  s3Service: S3Service

  // GET SIGNED S3 URL
  @Mutation(() => String, { nullable: true })
  getSignedS3Url(
    @Arg("data")
    data: S3SignedUrlInput,
  ): string {
    return this.s3Service.getSignedUrl(data)
  }

  // GET BULK SIGNED S3 URL
  @Mutation(() => [BulkSignedResponse], { nullable: true })
  getBulkSignedS3Url(
    @Arg("data")
    data: S3BulkSignedUrlInput,
  ): BulkSignedResponse[] {
    return this.s3Service.getBulkSignedUrl(data)
  }
}

import * as Yup from "yup"

declare module "yup" {
  export interface StringSchema {
    nullIfEmpty(): Yup.StringSchema
  }
  export interface NumberSchema {
    nullIfEmpty(): Yup.NumberSchema
  }
  export interface NullableArraySchema {
    nullIfEmpty(): Yup.NullableArraySchema
  }
  export interface ArraySchema {
    nullIfEmpty(): Yup.ArraySchema
  }
  export interface MixedSchema {
    nullIfEmpty(): Yup.MixedSchema
  }
}

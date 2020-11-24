import * as React from "react"
import { gql } from "@apollo/client"

import { useGetSignedUrlMutation, useGetBulkSignedUrlMutation } from "../graphql"
import { formatFileName } from "../helpers/utils"
import { useToast } from "./useToast"
import { useMutationHandler } from "./useMutationHandler"

export const GET_SIGNED_URL = gql`
  mutation GetSignedUrl($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data)
  }
`

interface Props {
  path?: string
}

export type UploadFile = {
  fileKey: string
  fileName: string
  fileType: string | null
}
export function useS3Upload(
  props?: Props,
): [(file: File, lazyProps?: Props) => Promise<UploadFile | void>, { loading: boolean }] {
  const [loading, setLoading] = React.useState(false)
  const [getS3SignedRequest] = useGetSignedUrlMutation()
  const toast = useToast()
  const handler = useMutationHandler()

  async function upload(file: File, lazyProps?: Props) {
    setLoading(true)
    let parsedKey = props?.path || lazyProps?.path || "/unknown"
    if (parsedKey[parsedKey.length - 1] === "/") {
      parsedKey = parsedKey.slice(0, -1)
    }
    if (parsedKey[0] === "/") {
      parsedKey = parsedKey.substr(1)
    }
    const formattedName = formatFileName(file.name)
    const key = parsedKey + "/" + formattedName
    const res = await handler(() => getS3SignedRequest({ variables: { data: { key, fileType: file.type } } }))
    if (!res || !res.data || !res.data.getSignedS3Url) {
      setLoading(false)
      return toast({
        status: "error",
        description: "Error uploading file, please try again",
      })
    }
    await fetch(res.data.getSignedS3Url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    }).catch(() => {
      toast({ status: "error", description: "Error uploading file" })
    })
    setLoading(false)
    return {
      fileKey: key,
      fileName: file.name,
      fileType: file.type || null,
    }
  }
  return [upload, { loading }]
}

export const GET_BULK_SIGNED_URL = gql`
  mutation GetBulkSignedUrl($data: S3BulkSignedUrlInput!) {
    getBulkSignedS3Url(data: $data) {
      url
      key
    }
  }
`

export function useS3BulkUpload(
  props: Props,
): [(files: File[], lazyProps?: Props) => Promise<UploadFile[] | void>, { loading: boolean }] {
  const [loading, setLoading] = React.useState(false)
  const [getBulkSigned] = useGetBulkSignedUrlMutation()
  const toast = useToast()
  const handler = useMutationHandler()

  async function upload(files: File[], lazyProps?: Props): Promise<UploadFile[] | void> {
    setLoading(true)
    let parsedKey = props?.path || lazyProps?.path || "/unknown"
    if (parsedKey[parsedKey.length - 1] === "/") {
      parsedKey = parsedKey.slice(0, -1)
    }
    if (parsedKey[0] === "/") {
      parsedKey = parsedKey.substr(1)
    }
    const fileData = files.map((file) => ({
      file,
      fileType: file.type,
      fileName: file.name,
      fileKey: parsedKey + "/" + formatFileName(file.name),
    }))
    const res = await handler(() =>
      getBulkSigned({
        variables: {
          data: {
            files: fileData.map((file) => ({
              key: file.fileKey,
              fileType: file.fileType,
            })),
          },
        },
      }),
    )
    if (!res || !res.data || !res.data.getBulkSignedS3Url) {
      setLoading(false)

      return toast({
        status: "error",
        description: "Error uploading image, please try again",
      })
    }

    try {
      await Promise.all(
        res.data.getBulkSignedS3Url.map((request) => {
          const file = fileData.find((d) => d.fileKey === request.key)
          if (!file) return null
          return fetch(request.url, {
            method: "PUT",
            headers: { "Content-Type": file.fileType },
            body: file.file,
          })
        }),
      )
    } catch (err) {
      setLoading(false)
      return toast({ status: "error", description: "Error uploading files" })
    }

    setLoading(false)
    return fileData.map((f) => ({
      fileKey: f.fileKey,
      fileName: f.fileName,
      fileType: f.fileType,
    }))
  }
  return [upload, { loading }]
}

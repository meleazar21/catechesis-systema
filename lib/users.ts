import { MagicUserMetadata } from "@magic-sdk/admin";
import { queryHasuraGraphQl } from "./hasura";

export async function isNewUser(issuer: string, token: string) {
  const operationsDoc = `
        query isNewUser($issuer: String!) {
          users(where: {issuer: {_eq: $issuer}}) {
            email
            id
            issuer
          }
        }
      `;

  const response = await queryHasuraGraphQl(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response?.data?.users?.length === 0 ? true : false;
}

export async function createNewUser(metadata: MagicUserMetadata, token: string) {
  const { issuer, email, publicAddress } = metadata;

  const operationsDoc = `
      mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
        insert_user(objects: {email: $email ,issuer: $issuer, publicAddress: $publicAddress, type: "guest"}) {
          returning {
            email
            id
            issuer
          }
        }
      }
    `;

  const response = await queryHasuraGraphQl(
    operationsDoc,
    "createNewUser",
    { email, issuer, publicAddress },
    token
  );
  console.log({ response: response.errors });
  return response;
}

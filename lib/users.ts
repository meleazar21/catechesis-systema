import { MagicUserMetadata } from "@magic-sdk/admin";
import { queryHasuraGraphQl } from "./hasura";
import { UsertType } from "@/enums/user-type";

export async function getUserByIssuer(issuer: string, token: string) {
  const operationsDoc = `
        query getUserByIssuer($issuer: String!) {
          user(where: {issuer: {_eq: $issuer}}) {
            id
            issuer
            publicAddress
            isActive
            userType
            email
            fullName
            description
            phone
          }
        }
      `;

  const response = await queryHasuraGraphQl(
    operationsDoc,
    "getUserByIssuer",
    { issuer },
    token
  );
  return response.data;
}

export async function createNewUser(metadata: MagicUserMetadata, token: string) {
  const { issuer, email, publicAddress } = metadata;
  const operationsDoc = `
      mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
        insert_user(objects: {email: $email ,issuer: $issuer, publicAddress: $publicAddress, isActive:true ,userType: ${UsertType.Guest}}) {
          returning {
            id
            issuer
            publicAddress
            isActive
            userType
            email
            fullName
            description
            phone
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
  return response;
}

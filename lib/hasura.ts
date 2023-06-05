import { HASURA_ADMIN_SECRET, HASURA_ADMIN_URL } from "@/constants/env-variables.constants";

export async function fetchGraphQL(operationsDoc: string, operationName: string, variables: {}, token: string) {
    const result = await fetch(HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}
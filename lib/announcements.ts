import { queryHasuraGraphQl } from "./hasura";

export const getAnnouncements = async (currentDate: string, token: string) => {
  const operationsDoc = `
    query getAnnouncements ($currentDate:date!, ) {
      Announcement(order_by: {date: asc}, where: {date: {_gte: $currentDate}}) {
        id
        thumbnail
        title
        description
        date
      }
    }
  `;
  const response = await queryHasuraGraphQl(operationsDoc, "getAnnouncements", { currentDate }, token);
  return response.data.Announcement;
}
export const getBirthdays = async (token: string) => {

} 
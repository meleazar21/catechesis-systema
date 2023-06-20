import { getHeadersRequest } from "@/utils/headers.util";

class StudentServices {
    async getStudentsBirthDate(token: string) {
        try {
            const request = await fetch('/api/birthdates', {
                method: "GET",
                headers: getHeadersRequest()
            });
            const response = await request.json();
            return { success: true, response: response };
        } catch (error) {
            return { success: false, response: error };
        }
    }
}
export const studentServices = new StudentServices();
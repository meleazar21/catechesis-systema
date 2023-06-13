import { DateFormats, DateSeparator } from "@/enums/date-formats";
import { IAnnouncements } from "@/interfaces/announcements";
import { getAnnouncements } from "@/lib/announcements";
import { formattDate } from "@/utils/date.util";

class AnnouncementService {

    async getAnnouncements(token: string) {
        const today = formattDate(new Date(), DateFormats.YYYY_MM_DD, DateSeparator.HYPHEN);
        const response = await getAnnouncements(today, token);
        const announcements = response.map((a: any) => {
            const announcement: IAnnouncements = {
                id: a.id,
                title: a.title,
                description: a.description,
                date: a.date,
                thumbnail: a.thumbnail
            }
            return announcement;
        });
        return announcements;
    }
}
export const announcementService = new AnnouncementService();
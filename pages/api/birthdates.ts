import { combineBirthDates, groupRecordsByMonth } from "@/helpers/birthdates-helper";
import { IBirthDatesRecord } from "@/interfaces/api/birthdates";
import { getBirthDatesCatechistas, getBirthDatesStudents } from "@/lib/birthdates";
import { NextApiRequest, NextApiResponse } from "next";

const Birthdates = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") return res.status(400).send({ success: false, message: "wrong type method" });

    try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substring(7, auth.length) : "";
        const students = await getBirthDatesStudents(didToken);
        const catechistas = await getBirthDatesCatechistas(didToken);
        const combinedRecords = combineBirthDates(students, catechistas);
        const groupedRecords = groupRecordsByMonth(combinedRecords);
        return res.status(200).send({ sucess: true, groupedRecords });
    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }
}
export default Birthdates;
const mongoose = require('mongoose');

const LOCAL_URI = 'mongodb://127.0.0.1:27017/studentDB';
const ATLAS_URI = 'mongodb://deeppatel7422_db_user:Deep0126@ac-yh7gkc8-shard-00-02.uysm1vp.mongodb.net:27017/studentDB?authSource=admin&tls=true&directConnection=true';

async function migrate() {
    try {
        console.log("Connecting to Local MongoDB...");
        const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
        console.log("Connected to Local.");

        const StudentSchema = new mongoose.Schema({ name: String, email: String }, { strict: false });
        const ExamSchema = new mongoose.Schema({ enrollNo: String, referenceId: String }, { strict: false });

        // 1. Migrate Students
        console.log("--- Migrating Students ---");
        const LocalStudent = localConn.model('Student', StudentSchema, 'students');
        const localStudents = await LocalStudent.find({}).lean();
        console.log(`Found ${localStudents.length} students locally.`);

        // 2. Migrate Exams
        console.log("--- Migrating Exams ---");
        const LocalExam = localConn.model('Exam', ExamSchema, 'exams');
        const localExams = await LocalExam.find({}).lean();
        console.log(`Found ${localExams.length} exams locally.`);

        console.log("Connecting to Atlas MongoDB (Direct Node 2)...");
        const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
        console.log("Connected to Atlas.");

        const AtlasStudent = atlasConn.model('Student', StudentSchema, 'students');
        const AtlasExam = atlasConn.model('Exam', ExamSchema, 'exams');

        if (localStudents.length > 0) {
            console.log("Uploading Students...");
            for (const s of localStudents) {
                const { _id, ...data } = s;
                await AtlasStudent.updateOne({ email: s.email }, { $set: data }, { upsert: true });
            }
        }

        if (localExams.length > 0) {
            console.log("Uploading Exams...");
            for (const e of localExams) {
                const { _id, ...data } = e;
                // For exams, we match by referenceId or enrollNo if referenceId is missing
                const match = e.referenceId ? { referenceId: e.referenceId } : { enrollNo: e.enrollNo, name: e.name };
                await AtlasExam.updateOne(match, { $set: data }, { upsert: true });
            }
        }

        console.log("Migration Successful for both Students and Exams!");

        await localConn.close();
        await atlasConn.close();
        process.exit(0);

    } catch (err) {
        console.error("Migration Failed:", err.message);
        process.exit(1);
    }
}

migrate();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "Localhost" storage for the ERP
  const students = [
    { id: "1", name: "Dinesh Kumar", rollNo: "CS2024001", course: "Computer Science", year: 2, semester: 4 },
    { id: "2", name: "Anjali Sharma", rollNo: "CS2024002", course: "Computer Science", year: 2, semester: 4 },
    { id: "3", name: "Rahul Verma", rollNo: "CS2024003", course: "Information Tech", year: 2, semester: 4 },
    { id: "4", name: "Priya Singh", rollNo: "CS2024004", course: "Information Tech", year: 2, semester: 4 },
  ];

  const attendance = [
    { id: "1", studentId: "1", date: "2024-05-15", status: "present", subject: "Data Structures" },
    { id: "2", studentId: "1", date: "2024-05-16", status: "present", subject: "Algorithms" },
    { id: "3", studentId: "1", date: "2024-05-17", status: "absent", subject: "Database" },
    { id: "4", studentId: "1", date: "2024-05-18", status: "present", subject: "Operating Systems" },
    { id: "5", studentId: "1", date: "2024-05-19", status: "present", subject: "Networks" },
    
    { id: "6", studentId: "2", date: "2024-05-15", status: "present", subject: "Data Structures" },
    { id: "7", studentId: "2", date: "2024-05-16", status: "absent", subject: "Algorithms" },
    { id: "8", studentId: "2", date: "2024-05-17", status: "present", subject: "Database" },
    { id: "9", studentId: "2", date: "2024-05-18", status: "present", subject: "Operating Systems" },
    
    { id: "10", studentId: "3", date: "2024-05-15", status: "present", subject: "Web Dev" },
    { id: "11", studentId: "3", date: "2024-05-16", status: "present", subject: "Cloud Computing" },
    { id: "12", studentId: "4", date: "2024-05-15", status: "absent", subject: "Web Dev" },
    { id: "13", studentId: "4", date: "2024-05-16", status: "present", subject: "Cloud Computing" },
  ];

  const marks = [
    { id: "1", studentId: "1", subject: "Data Structures", marksObtained: 85, totalMarks: 100, semester: 4 },
    { id: "2", studentId: "1", subject: "Algorithms", marksObtained: 78, totalMarks: 100, semester: 4 },
    { id: "3", studentId: "1", subject: "Database", marksObtained: 92, totalMarks: 100, semester: 4 },
    
    { id: "4", studentId: "2", subject: "Data Structures", marksObtained: 92, totalMarks: 100, semester: 4 },
    { id: "5", studentId: "2", subject: "Algorithms", marksObtained: 88, totalMarks: 100, semester: 4 },
    
    { id: "6", studentId: "3", subject: "Web Dev", marksObtained: 75, totalMarks: 100, semester: 4 },
    { id: "7", studentId: "4", subject: "Web Dev", marksObtained: 82, totalMarks: 100, semester: 4 },
  ];

  const fees = [
    { id: "1", studentId: "1", amount: 45000, date: "2024-01-10", status: "paid", type: "Tuition", receiptNo: "REC-001" },
    { id: "2", studentId: "1", amount: 5000, date: "2024-03-15", status: "pending", type: "Exam" },
    { id: "3", studentId: "1", amount: 12000, date: "2024-02-05", status: "paid", type: "Hostel", receiptNo: "HOS-101" },
    
    { id: "4", studentId: "2", amount: 45000, date: "2024-01-12", status: "paid", type: "Tuition", receiptNo: "REC-002" },
    { id: "5", studentId: "2", amount: 5000, date: "2024-03-12", status: "paid", type: "Exam", receiptNo: "EXM-202" },
    
    { id: "6", studentId: "3", amount: 45000, date: "2024-01-15", status: "pending", type: "Tuition" },
    { id: "7", studentId: "4", amount: 45000, date: "2024-01-15", status: "paid", type: "Tuition", receiptNo: "REC-003" },
  ];

  // API Routes
  app.get("/api/students", (req, res) => res.json(students));
  app.get("/api/attendance", (req, res) => res.json(attendance));
  app.get("/api/marks", (req, res) => res.json(marks));
  app.get("/api/fees", (req, res) => res.json(fees));

  app.post("/api/attendance", (req, res) => {
    const newItem = { id: Date.now().toString(), ...req.body };
    attendance.push(newItem);
    res.status(201).json(newItem);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ERP Server running on http://localhost:${PORT}`);
  });
}

startServer();

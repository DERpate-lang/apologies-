import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database for demo (in a real app, use Firebase or SQL)
  let evidenceStore = [
    {
      id: '1',
      type: 'action',
      content: "بدأت استخدام تقويم مشترك لجميع خططنا.",
      date: "2026-05-04",
      note: "لا مزيد من الوعود المنسية أو تداخل المواعيد."
    },
    {
      id: '2',
      type: 'description',
      content: "قرأت كتاب 'التواصل غير العنيف' لتحسين كيفية التعبير عن احتياجاتي.",
      date: "2026-05-06",
      note: "أتعلم التحدث دون لوم."
    }
  ];

  // API Routes
  app.get("/api/evidence", (req, res) => {
    res.json(evidenceStore);
  });

  app.post("/api/evidence", (req, res) => {
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      date: new Date().toLocaleDateString('ar-EG')
    };
    evidenceStore = [newItem, ...evidenceStore];
    res.status(201).json(newItem);
  });

  app.delete("/api/evidence/:id", (req, res) => {
    evidenceStore = evidenceStore.filter(item => item.id !== req.params.id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

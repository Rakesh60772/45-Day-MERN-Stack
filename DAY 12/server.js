const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

const mongoUrl = "mongodb://localhost:27017";
const dbName = "BlogData";
let db;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db(dbName);
    console.log("✅ MongoDB connected successfully");

  
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
  });

// Route to handle blog submission
app.post("/submit-blog", async (req, res) => {
  const info = req.body;
  const data ={
"title": info.title,
"content": info.content,
"author": info.author,
"published": true,
"createdAt": new Date()
}

  if (!info.title || !info.content || !info.author) {
  return res.status(400).json({ error: "Blog Title, Blog and author name are required." });
}

  try {
    const result = await db.collection("blogs").insertOne(data);
    res.status(201).json({ message: "Blog submitted successfully!", blogId: result.insertedId });
  } catch (error) {
    console.error("Error inserting blog:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/read-blog", async (req, res) => {
	try {
		// Retrieve from MongoDB (Challenge Requirement)
		const data = await db.collection("blogs").find({}).toArray();
		res.json(data);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Failed to retrieve projects",
		});
	}
});
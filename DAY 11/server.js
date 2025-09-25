const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const PORT = 3000;
// MongoDB connection
const mongoUrl = "mongodb://localhost:27017";
const dbName = "resumeData";
let db;
// Middleware
app.use(express.json());

// POST /api/projects - Create new project (Challenge Requirement)
app.post("/api/projects", async (req, res) => {
	try {
		const projectData = req.body;

		// Basic validation
		if (!projectData.title || !projectData.description) {
			return res.status(400).json({
				success: false,
				error: "Title and description are required",
			});
		}

		// Add timestamps
		projectData.createdAt = new Date();
		projectData.updatedAt = new Date();

		// Insert into MongoDB (Challenge Requirement)
		const result = await db.collection("projects").insertOne(projectData);
		res.status(201).json({
			success: true,
			message: "Project created successfully",
			data: { ...projectData, _id: result.insertedId },
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: "Failed to create project",
		});
	}
});

// GET /api/projects - Get all projects (Challenge Requirement)
app.get("/api/projects", async (req, res) => {
	try {
		// Retrieve from MongoDB (Challenge Requirement)
		const projects = await db.collection("projects").find({}).toArray();
		res.json({
			success: true,
			count: projects.length,
			data: projects,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Failed to retrieve projects",
		});
	}
});

// PUT /api/projects/:id - Update project (Challenge Requirement)
app.put("/api/projects/:id", async (req, res) => {
	try {
		const projectId = req.params.id;
		const objectId = new ObjectId(projectId);
		const updateData = req.body;
		updateData.updatedAt = new Date();
		const result = await db
			.collection("projects")
			.updateOne({ _id: objectId }, { $set: updateData });
		if (result.matchedCount === 0) {
			return res.status(404).json({
				success: false,
				error: "Project not found",
			});
		}
		res.json({
			success: true,
			message: "Project updated successfully",
			modifiedCount: result.modifiedCount,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Failed to update project",
		});
	}
});

// DELETE /api/projects/:id - Delete project (Challenge Requirement)
app.delete("/api/projects/:id", async (req, res) => {
	try {
		const projectId = req.params.id;
		const objectId = new ObjectId(projectId);
		const result = await db.collection("projects").deleteOne({
			_id: objectId,
		});
		if (result.deletedCount === 0) {
			return res.status(404).json({
				success: false,
				error: "Project not found",
			});
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Failed to delete project",
		});
	}
});

// Connect to MongoDB and start server
MongoClient.connect(mongoUrl).then((client) => {
	db = client.db(dbName);
	console.log("✅ Connected to MongoDB");
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
});

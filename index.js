import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mh16alw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;
let usersCollection, branchesCollection, buildingsCollection, floorsCollection, roomsCollection, bedsCollection;
let paymentsCollection, accountTransactionsCollection;

async function run() {
    try {
        await client.connect();
        console.log("MongoDB Connected ✅");

        db = client.db("hostel_management");

        usersCollection = db.collection("users");
        branchesCollection = db.collection("branches");
        buildingsCollection = db.collection("buildings");
        floorsCollection = db.collection("floors");
        roomsCollection = db.collection("rooms");
        bedsCollection = db.collection("beds");

        paymentsCollection = db.collection("payments");
        accountTransactionsCollection = db.collection("account_transactions");

    } catch (err) {
        console.error(err);
    }
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Hostel Management Server Running 🚀"));

// ---------------- USERS ----------------

// Create
app.post("/users", async (req, res) => {
    const result = await usersCollection.insertOne(req.body);
    res.send(result);
});
// Read All
app.get("/users", async (req, res) => {
    const users = await usersCollection.find().toArray();
    res.send(users);
});
// Read One
app.get("/users/:id", async (req, res) => {
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(user);
});
// Update
app.put("/users/:id", async (req, res) => {
    const result = await usersCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});
// Delete
app.delete("/users/:id", async (req, res) => {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

// ---------------- BRANCHES ----------------
app.post("/branches", async (req, res) => {
    const result = await branchesCollection.insertOne(req.body);
    res.send(result);
});
app.get("/branches", async (req, res) => {
    const data = await branchesCollection.find().toArray();
    res.send(data);
});
app.get("/branches/:id", async (req, res) => {
    const data = await branchesCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(data);
});
app.put("/branches/:id", async (req, res) => {
    const result = await branchesCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});
app.delete("/branches/:id", async (req, res) => {
    const result = await branchesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

// ---------------- BUILDINGS ----------------


app.post("/buildings", async (req, res) => {
    const result = await buildingsCollection.insertOne(req.body);
    res.send(result);
});


app.get("/buildings/all", async (req, res) => {
  try {
    const data = await buildingsCollection.find().toArray();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch buildings" });
  }
});

app.get("/buildings/:branchId", async (req, res) => {
    const data = await buildingsCollection.find({ branch_id: req.params.branchId }).toArray();
    res.send(data);
});
app.get("/buildings/single/:id", async (req, res) => {
    const data = await buildingsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(data);
});
app.put("/buildings/:id", async (req, res) => {
    const result = await buildingsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});
app.delete("/buildings/:id", async (req, res) => {
    const result = await buildingsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

// ---------------- FLOORS ----------------
// Get all floors
app.get("/floors/all", async (req, res) => {
    try {
        const data = await floorsCollection.find().toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch floors" });
    }
});


app.post("/floors", async (req, res) => {
    const result = await floorsCollection.insertOne(req.body);
    res.send(result);
});
app.get("/floors/:buildingId", async (req, res) => {
    const data = await floorsCollection.find({ building_id: req.params.buildingId }).toArray();
    res.send(data);
});
app.get("/floors/single/:id", async (req, res) => {
    const data = await floorsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(data);
});
app.put("/floors/:id", async (req, res) => {
    const result = await floorsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});
app.delete("/floors/:id", async (req, res) => {
    const result = await floorsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

// ---------------- ROOMS ----------------
// ---------------- ROOMS ----------------
// Get all rooms
app.get("/rooms/all", async (req, res) => {
    try {
        const data = await roomsCollection.find().toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch rooms" });
    }
});



app.post("/rooms", async (req, res) => {
    const result = await roomsCollection.insertOne(req.body);
    res.send(result);
});

app.get("/rooms/floor/:floorId", async (req, res) => {
    const data = await roomsCollection
        .find({ floor_id: req.params.floorId })
        .toArray();
    res.send(data);
});

app.get("/rooms/single/:id", async (req, res) => {
    const data = await roomsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(data);
});
// Update room
app.put("/rooms/:id", async (req, res) => {
    const result = await roomsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});

// Delete room
app.delete("/rooms/:id", async (req, res) => {
    const result = await roomsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

// ---------------- BEDS ----------------
// ---------------- BEDS ----------------
// Get all beds
app.get("/beds/all", async (req, res) => {
    try {
        const data = await bedsCollection.find().toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch beds" });
    }
});

app.post("/beds", async (req, res) => {
    const result = await bedsCollection.insertOne(req.body);
    res.send(result);
});


app.post("/beds/:bedId/assign", async (req, res) => {
  const { bedId } = req.params;
  const { user_id } = req.body;

  try {
    await bedsCollection.updateOne(
      { _id: new ObjectId(bedId) },
      { $set: { occupant: user_id } }
    );

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: "Assign failed" });
  }
});

app.patch("/beds/:bedId/unassign", async (req, res) => {
  const { bedId } = req.params;

  try {
    await bedsCollection.updateOne(
      { _id: new ObjectId(bedId) },
      { $set: { occupant: null } }   // 👈 remove user
    );

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: "Unassign failed" });
  }
});



// Get all beds for a room
app.get("/beds/room/:roomId", async (req, res) => {
    const data = await bedsCollection.find({ room_id: req.params.roomId }).toArray();
    res.send(data);
});

app.get("/beds/single/:id", async (req, res) => {
    const data = await bedsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(data);
});
app.put("/beds/:id", async (req, res) => {
    const result = await bedsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result);
});
app.delete("/beds/:id", async (req, res) => {
    const result = await bedsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
});

// ---------------- PAYMENTS + ACCOUNTING ----------------
app.post("/payments", async (req, res) => {
    const payment = req.body;
    const result = await paymentsCollection.insertOne(payment);

    // Auto accounting entry
    await accountTransactionsCollection.insertOne({
        branch_id: payment.branch_id,
        debit_account_id: payment.debit_account_id,
        credit_account_id: payment.credit_account_id,
        amount: payment.amount,
        reference_type: "payment",
        reference_id: result.insertedId,
        date: new Date(),
    });

    res.send(result);
});

app.put("/payments/:id", async (req, res) => {
  try {
    const updateData = req.body; // eikhane status + issuer thakte pare
    const result = await paymentsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update payment" });
  }
});

app.get("/payments", async (req, res) => {
    const data = await paymentsCollection.find().toArray();
    res.send(data);
});

app.get("/transactions", async (req, res) => {
    const data = await accountTransactionsCollection.find().toArray();
    res.send(data);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const PORT = 3000;

// Schema to create polygon coordinates
const coordinatesSchema = new mongoose.Schema({
    // Saved in case if we need it later
    // id: {
    //     type: Number,
    //     unique: true,
    //     required: true
    // },

    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },
    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },
    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },

    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },

    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },

    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },
    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },
    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },
})

const Coordinates = mongoose.model("coordinates", coordinatesSchema);

const uri = "mongodb+srv://yen:Zenmind@cluster0.l71c9kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectDB() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}

//create coordinates for a food desert polygon
app.post("/coordinates", async (req, res) => {
    try {
        const { id } = req.body;

        let savedCoordinates = await Coordinates.findById(id);

        if (!savedCoordinates) {
            const coordinates = new Coordinates({ lat, lng });
            coordinates.save();
            res.status(200).json("new coordinates created");
        }
        else {
            res.status(400).json("ID already exists. Please create a new ID for your coordinates.")
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});

//Retrieve coordinates for food desert location 
app.get("/coordinates/:id", async (req, res) => {

    try {
        let id = req.params.id;
        let coordinates = await Coordinates.findById(id);

        if (coordinates) {
            res.status(200).json(coordinates);
        }
        else {
            res.status(400).json("coordinates do not exist.")
        }
    }

    catch (error) {
        res.status(400).json(error);
    }
});

app.listen(PORT, async () => { console.log(`localserver:${PORT}`); await connectDB().catch(console.dir); })



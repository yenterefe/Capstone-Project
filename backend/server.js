const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());



const PORT = 3000;

// Schema to create polygon coordinates
const coordinatesSchema = new mongoose.Schema({
    lat: {
        type: Number,
        unique: true
    },

    lng: {
        type: Number,
        unique: true
    },
},
)

// Creating a composite unique index for lat and lng
coordinatesSchema.index({ lat: 1, lng: 1 }, { unique: true });

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


app.post("/coordinates", async (req, res) => {
    try {
        const coordinatesArray = req.body; // Expecting an array of coordinates

        // Save each coordinate
        const savedCoordinates = await Promise.all(
            coordinatesArray.map(async (coord) => {
                // Check if this coordinate already exists
                const existingCoordinate = await Coordinates.findOne({ lat: coord.lat, lng: coord.lng });

                if (!existingCoordinate) {
                    const newCoordinate = new Coordinates(coord);
                    return newCoordinate.save();
                }
                return existingCoordinate;
            })
        );

        res.status(200).json({ message: "Coordinates processed", data: savedCoordinates });
    } catch (error) {
        res.status(400).send(error);
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

app.listen(PORT, async () => { console.log(`http://localhost:${PORT}`); await connectDB().catch(console.dir); })



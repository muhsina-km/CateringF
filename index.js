const express = require("express");
const cors = require("cors");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const loginModel = require("./model/login");
const fooddetailsmodel = require("./model/food");
const packagedetailsmodel= require("./model/package");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API creation
app.get('/', (request, response) => {
    response.send("Hai");
});


//PLANT
//for saving plant data

app.post('/pnew', 
async (request, response) => {
    try {
    const { packid,packname,packtype,pprice,pdescription,status } = request.body;
    console.log(request.body);
    const newdata = new plantdetailsmodel({
        packid,
        packname,
        packtype,
        pprice,
        pdescription,
        status,
    })
    await newdata.save();
    response.json({message:"Record Saved"});
} catch(error) {
    console.error("Error saving data to Mongodb:",error);
    response.status(500).json({error:"Internal Server Error"})
}
});


//for retrieving plant data

app.get('/pview', async (request, response) => {
    try {
        var data = await plantdetailsmodel.find();
    response.send(data)
    } catch(error) {
        console.error("Error in /pview:",error);
        response.status(500).json({error:"Internal error"})
    }
});

//for update status of plant-delete 

app.put('/updatestatus/:id',async(request,response)=>{
    let id=request.params.id
    await plantdetailsmodel.findByIdAndUpdate(id, { $set:{status:"INACTIVE"} });
    response.send("Record Deleted")
})

//for modifying the plant details 

app.put('/pedit/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updatedData = request.body;
        const updatedPackage = await packagedetailsmodel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPackage) {
            return response.status(404).json({ message: 'Package not found' });
        }
        response.json({ message: 'Record Updated', updatedPackage });
    } catch (error) {
        console.error('Error updating package details:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
});


//PLANT TYPE

// app.post('/ptnew', (request, response) => {
//     new packagedetailsmodel(request.body).save()
//     response.send("Success")
// })
app.post('/ptnew', upload.single('image'), async (request, response) => {
    try {
                const { packid,
                    packname,
                    packtype,
                    pprice,
                    pdescription,
                    status} = request.body
                const newdata = new packagedetailsmodel({
                    packid,
                    packname,
                    packtype,
                    pprice,
                    pdescription,
                    status,
                    image: {
                        data: request.file.buffer,
                        contentType: request.file.mimetype,
                    }
                })
                await newdata.save();
                res.status(200).json({ message: 'items added successfully' });
        }
    catch (error) 
    {
                response.status(500).json({ error: 'Internal Server Error' });
    }
}
)


app.get('/ptview', async (request, response) => {
    var data = await packagedetailsmodel.find();
    response.send(data)
})

app.put('/ptupdatestatus/:id', async (request, response) => {
    let id = request.params.id
    await packagedetailsmodel.findByIdAndUpdate(id, { $set: { Status: "INACTIVE" } })
    response.send("Record Deleted")
})


app.put('/ptedit/:id', async (request, response) => {
    let id = request.params.id
    await packagedetailsmodel.findByIdAndUpdate(id, request.body)
    response.send("Record Updated")

})




///

app.get('/pakview/:id', async (req, res) => {
    try {
      const packageId = req.params.id;
      const packageDetails = await packagedetailsmodel.findById(packageId); // Corrected model name
      if (!packageDetails) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json(packageDetails);
    } catch (error) {
      console.error('Error fetching package details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Assign port
app.listen(3005, () => {
    console.log("Port is running on 3005");
});

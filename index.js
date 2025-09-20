import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import multer from "multer";
const app = express();
const port = 3000;

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database: "shop",
  password: "0",
  port:5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, 'public/uploads')
    },
   filename: function (req, file, cb) {
         cb(null, file.fieldname + '-' + Date.now())
   }
});
const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
    const result = await db.query("SELECT id, name, description, price, img FROM product");
    const products = result.rows.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imgUrl: product.img ? `/uploads/${product.img}` : null,
    }));
    res.render("index.ejs",{ products });
    console.log("products: ",products);
});

app.get('/add-product', async(req, res) =>{
    res.render("add-product.ejs");
})

// add new product section:
app.post("/addProduct", upload.single('productImg'), async (req, res) => {
    const name = req.body.productName;
    const description = req.body.productDescription;
    const price = req.body.productPrice;

    const image = req.file;

    const imageFilename = image ? image.filename : null;

    await db.query(
        "INSERT INTO product (name, description, price, img) VALUES ($1, $2, $3, $4)",
        [name, description, price, imageFilename]
    );

    res.redirect("/");
});

app.get("/edit-product", async(req, res) =>{
    const result = await db.query("SELECT * FROM product");
    const products = result.rows.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imgUrl: product.img ? `/uploads/${product.img}` : null,
    }));
res.render("edit-product.ejs", {products});
})
app.listen(port, () =>{
    console.log(`app is running in port:${port}`)
})

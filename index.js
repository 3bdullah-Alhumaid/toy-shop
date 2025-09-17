import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

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

app.get("/", async(req, res) =>{
    let products =[];
    const result= await db.query("SELECT name, description, price, img FROM product");
    result.rows.forEach((product) => {
    products.push(product.name);    
    });
      return products;
    const shortcut = result.rows[0];
    console.log(result.rows[0]);
    res.render("index.ejs",{
        name: shortcut.name,
        description: shortcut.description,
        price: shortcut.price,
        img: shortcut.img,
    });
})

app.get('/add-product', async(req, res) =>{
    res.render("add-product.ejs");
})


app.post("/addProduct", async(req,res)=>{
    const name = req.body.productName;
    const description = req.body.productDescription;
    const price = req.body.productPrice;
    const img = req.body.productImg;
 
    const result = await db.query("INSERT INTO product (name,description,price,img) VALUES ($1,$2,$3,$4)",
    [name, description, price, img]);
})


app.listen(port, () =>{
    console.log(`app is running in port:${port}`)
})

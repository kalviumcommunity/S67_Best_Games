const connectDB = require("./database");
const { User, Product, Category } = require("./schema");

const seedDatabase = async () => {
    await connectDB();

    await Category.create({ name: "Electronics", description: "Gadgets & Devices" });

    await Product.create({
        name: "Laptop",
        description: "Gaming Laptop",
        price: 1200,
        stock: 10,
        categoryId: (await Category.findOne({ name: "Electronics" }))._id
    });

    await User.create({ name: "John Doe", email: "john@example.com", password: "hashedpassword" });

    console.log("Database Seeded!");
    process.exit();
};

seedDatabase();
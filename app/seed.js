// seed.js

const Role = require("./models/role.model"); // Adjust the path based on your project structure
const seedDatabase = async () => {
  try {
    // Seed roles
    const rolesData = [
      { name: "siswa" },
      { name: "guru" },
      { name: "admin" },
      // Add more roles as needed
    ];
    await Role.bulkCreate(rolesData);

    console.log("Roles seeded successfully");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

// Call the seedDatabase function to populate the database
seedDatabase();

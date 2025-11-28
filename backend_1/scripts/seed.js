import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from '../models/Employee.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_task_db';

const employees = [
  { name: 'Alice Johnson', email: 'alice@example.com', position: 'Developer', department: 'Engineering', role: 'Developer' },
  { name: 'Bob Smith', email: 'bob@example.com', position: 'Designer', department: 'Design', role: 'Designer' },
  { name: 'Charlie Lee', email: 'charlie@example.com', position: 'PM', department: 'Product', role: 'Manager' },
];

const tasks = [
  { title: 'Setup project repo', description: 'Initialize repo and basic folders', status: 'Completed' },
  { title: 'Design landing', description: 'Create UI design for dashboard', status: 'In Progress' },
  { title: 'Implement auth', description: 'Add JWT auth endpoints', status: 'Pending' },
];

const run = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to DB');

    await Employee.deleteMany({});
    await Task.deleteMany({});
    await User.deleteMany({});
    await User.deleteMany({});

    const created = await Employee.insertMany(employees);

    // assign tasks to employees round-robin
    const tasksToInsert = tasks.map((t, i) => ({ ...t, assignedTo: created[i % created.length]._id }));
    await Task.insertMany(tasksToInsert);
    // create default admin user
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'password';
    const hash = await bcrypt.hash(adminPassword, 10);
    await User.create({ name: 'Admin', email: 'admin@example.com', password: hash });

    // create default user
    const passwordHash = await bcrypt.hash('password', 10);
    await User.create({ name: 'Admin User', email: 'admin@example.com', password: passwordHash });

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();

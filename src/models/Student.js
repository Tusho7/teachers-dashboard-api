import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique identifier for the student record',
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name', 
        comment: 'First name of the student',
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name', 
        comment: 'Last name of the student',
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'start_date',
        comment: 'Date when the student started attending',
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phone_number',
        comment: 'Phone number of the student',
    },
    facebook_profile: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'facebook_profile',
        comment: 'Facebook profile link of the student',
    },
    how_much_pays: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0.0,
        field: 'how_much_pays',
        comment: 'Amount the student pays (e.g., fees)',
    },
    payment_status: {
        type: DataTypes.ENUM('გადახდილი', 'გადაუხდელი'),
        defaultValue: 'გადაუხდელი',
        field: 'payment_status', 
        comment: 'Current payment status of the student',
    },
    days_per_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'days_per_week', 
        comment: 'Number of days per week the student attends lectures',
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'payment_date', 
        comment: 'Date of the last payment made by the student',
    },
    next_payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'next_payment_date', 
        comment: 'Date of the next payment due for the student',
    },
    attendance_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'attendance_count',
        comment: 'Total number of attendances by the student',
    },
    days_of_week: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'days_of_week',
        comment: 'Days of the week the student attends (e.g., "Monday,Wednesday,Friday")',
    },
    eighth_lesson_date: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'eighth_lesson_date',
        comment: 'Date when the student attends the 8th lesson',
    },
}, {
    timestamps: true,
    tableName: 'students',
    comment: 'Table storing information about students attending lectures',
});

export default Student;

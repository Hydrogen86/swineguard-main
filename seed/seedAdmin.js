const bcrypt = require('bcrypt');
const Admin = require('../src/models/admin');
const { default: mongoose } = require('mongoose');

const adminEmail = 'marinduque.pvet@gmail.com';
const adminPassword = 'swineguard123';

const adminEmailv2 = 'pvet.admin@gmail.com';
const adminPasswordv2 = 'swineguardADMIN123';

(async () => {
    await mongoose.connect('mongodb://localhost:27017/swineguard_db');
    const existingAdmin = await Admin.findOne({adminEmail: adminEmail});
    const existingAdminv2 = await Admin.findOne({adminEmail: adminEmailv2});
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = new Admin({ 
            firstName: "Provincial",
            middleName: "Veterinary",
            lastName: "Office",
            adminContact: "09503505396",
            adminAddress: "Bangbangalon, Boac, Marinduque",
            adminEmail: adminEmail, 
            adminPassword: hashedPassword 
        });

        await admin.save();
        console.log('✅ Admin account created');
    } if (!existingAdminv2) {
        const hashedPasswordv2 = await bcrypt.hash(adminPasswordv2, 10);
        const admin = new Admin({ 
            firstName: "Provincial",
            middleName: "Veterinary",
            lastName: "Office II",
            adminContact: "09266495922",
            adminAddress: "Bangbangalon, Boac, Marinduque",
            adminEmail: adminEmailv2, 
            adminPassword: hashedPasswordv2 
        });
        await admin.save();
        console.log('✅ Admin account II created');
    }else {
        console.log('⚠️ Admin already exists');
    }
    mongoose.disconnect();
})();
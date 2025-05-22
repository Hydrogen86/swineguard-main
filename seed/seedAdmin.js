const bcrypt = require('bcrypt');

const User = require('../src/models/user');
const { default: mongoose } = require('mongoose');

const adminEmail = 'marinduque.pvet@gmail.com';
const adminPassword = 'swineguard123';

const AC_staff = 'ACstaff@gmail.com';
const AC_staff_password = 'qwerty12345';

const IC_staff = 'ICstaff@gmail.com';
const IC_staff_password = 'qwerty12345';

(async () => {
    await mongoose.connect('mongodb://localhost:27017/swineguard_db');
    
    const existingAdminAcc = await User.findOne({email: adminEmail});
    const existingAC_staffAcc = await User.findOne({email: AC_staff});
    const existingIC_staffAcc = await User.findOne({email: IC_staff});

    if (!existingAdminAcc) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const userAdmin = new User({ 
            firstName: "Provincial",
            middleName: "Veterinary",
            lastName: "Office",
            contact: "09503505396",
            barangay: "Bangbangalon",
            municipality: "Boac",
            email: adminEmail, 
            password: hashedPassword,
            role: 'admin'
        });

        await userAdmin.save();
        console.log('✅ Admin account created');
    } if (!existingAC_staffAcc) {
        const hashed_ACstaff_password = await bcrypt.hash(AC_staff_password, 10);
        const user = new User({ 
            firstName: "Robert",
            middleName: "M",
            lastName: "Magno",
            contact: "09266495922",
            barangay: "Mahunig",
            municipality: "Gasan",
            email: AC_staff, 
            password: hashed_ACstaff_password,
            role: 'ac_staff'
        });
        await user.save();
        console.log('✅ AC staff account created successfully.');
    } if (!existingIC_staffAcc) {
        const hashed_ICstaff_password = await bcrypt.hash(IC_staff_password, 10);
        const user = new User({ 
            firstName: "John",
            middleName: "X",
            lastName: "Doe",
            contact: "09266495922",
            barangay: "Mahunig",
            municipality: "Gasan",
            email: IC_staff, 
            password: hashed_ICstaff_password,
            role: 'ic_staff'
        });
        await user.save();
        console.log('✅ IC staff account created successfully.');
    }  else {
        console.log('⚠️ Account already exists');
    }
    mongoose.disconnect();
})();
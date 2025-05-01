
const appointmentRequest = require('@models/appointment');
const express = require('express');
const addresses = require('../../data/addresses.json'); //addresses from json file
const services = require('../../data/services.json'); //services from json file
const swines = require('../../data/swines.json'); //swine type from json file
const medicines = require('../../data/medicine.json'); //swine meds from json file
const vetPersonnel = require('../../data/vetPersonnel.json'); //vet personnel from json file

//Add Apointments
exports.addAppointment = async (req, res) => {
    try {
        const {  appointmentTitle, swineType, swineCount, appointmentDate, appointmentTime, swineSymptoms, swineAge, swineMale, swineFemale, appointmentStatus, municipality, barangay, clientName, clientContact, clientEmail } = req.body;
        const requestAppointment = new appointmentRequest({
            appointmentTitle, 
            swineType, 
            swineCount, 
            appointmentDate, 
            appointmentTime, 
            swineSymptoms, 
            swineAge, 
            swineMale, 
            swineFemale, 
            appointmentStatus, 
            municipality, 
            barangay, 
            clientName, 
            clientContact, 
            clientEmail
        });
        await requestAppointment.save();
        res.status(201).json({message: 'Appointment added successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//GET ALL APPOINTMENTS
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentRequest.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Update appointment by Id Mark as Ongoing
exports.updateAppointments = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime, appointmentStatus, vetPersonnel, medicine, dosage, vetMessage } = req.body;
        const update = await appointmentRequest.findByIdAndUpdate(
            req.params.id,
            { appointmentDate, appointmentTime, appointmentStatus, vetPersonnel, medicine, dosage, vetMessage },
            { new : true } 
        );
        res.status(200).json(update);
    } catch (err) {
        console.error("Error updating appointment", err);
        res.status(500).json({error: "Failed to update appointment"});
    }
}

//Update appointment by Id and mark as reschedule
exports.rescheduleAppointments = async (req, res) => {
    try {
        const { appointmentStatus } = req.body;
        const update = await appointmentRequest.findByIdAndUpdate(
            req.params.id,
            { appointmentStatus },
            { new: true }
        );
        res.status(200).json(update);
    } catch (err) {
        console.error("Error reschedule appointment", err);
        res.status(500).json({error: "Failed to reschedule appointment"});
    }
}
//Update appointment by Id and mark as removed
exports.removeAppointments = async (req, res) => {
    try {
        const { appointmentStatus } = req.body;
        const update = await appointmentRequest.findByIdAndUpdate(
            req.params.id,
            { appointmentStatus },
            { new: true }
        );
        res.status(200).json(update);
    } catch (err) {
        console.error("Error removing appointment", err);
        res.status(500).json({error: "Failed to remove appointment"});
    }
}

// Restore the removed appointments
exports.restoreAppointments = async (req, res) => {
    try {
        const { appointmentStatus } = req.body;
        const update = await appointmentRequest.findByIdAndUpdate(
            req.params.id,
            { appointmentStatus }.appointmentStatus,
            { new: true }
        );
        res.status(200).json(update);
    } catch (err) {
        console.error("Error restoring appointment", err);
        res.status(500).json({error: "Failed to restore appointment"});
    }
}

// Delete appointments by id
exports.deleteAppointments = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await appointmentRequest.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment deleted successfully", deletedAppointment });
    } catch (err) {
        console.error("Error deleting appointment", err);
        res.status(500).json({error: "Failed to delte appointment"});
    }
}

//Update appointment by Id and mark as completed
exports.completedAppointments = async (req, res) => {
    try {
        const { appointmentStatus } = req.body;
        const update = await appointmentRequest.findByIdAndUpdate(
            req.params.id,
            { appointmentStatus },
            { new: true }
        );
        res.status(200).json(update);
    } catch (err) {
        console.error("Error completing appointment", err);
        res.status(500).json({error: "Failed to complete appointment"});
    }
}

//Send all addresses from the json file folder
exports.getAllAddresses = async (req, res) => {
    try {
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// send all services from the json file
exports.getAllServices = async (req, res) => {
    try {
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Send all swine type from the json file
exports.getAllSwineType = async (req, res) => {
    try {
        res.status(200).json(swines)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//Send all medicines from stocks as of now from json file
exports.getAllMedicines = async (req, res) => {
    try {
        res.status(200).json(medicines)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Send all vet personnel from stocks as of now from json file
exports.getAllPersonnel = async (req, res) => {
    try {
        res.status(200).json(vetPersonnel)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get user email using id
exports.getClientEmail = async (req, res) => {
    try {
        const appointment = await appointmentRequest.findById(req.params.id); // using appointment model
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        res.json({ email: appointment.clientEmail }); // get client email from the appointment
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
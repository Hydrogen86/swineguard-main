
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
exports.getAllAppointments= async (req, res) => {
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
            { new : true } //retruns the update documents
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
//Update appointment by Id and mark as removed
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
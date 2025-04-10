
const appointmentRequest = require('@models/appointment');
const express = require('express');

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
        const { appointmentDate, appointmentTime, appointmentStatus } = req.body;
        const update = await appointmentRequest.findByIdAndUpdate(
            req.params.id,
            { appointmentDate, appointmentTime, appointmentStatus },
            { new : true } //retruns the update documents
        );
        res.status(200).json(update);
    } catch (err) {
        console.error("Error updating appointment", err);
        res.status(500).json({error: "Failed to update appointment"});
    }
}

//Update appointment by Id and mark as reschedule
exports.rejectAppointments = async (re, res) => {
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
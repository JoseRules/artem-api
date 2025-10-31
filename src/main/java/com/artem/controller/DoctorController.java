package com.artem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.artem.entity.Doctor;
import com.artem.service.DoctorService;

@RestController
@RequestMapping(path = "api/v1/doctor")
public class DoctorController {
	
	@Autowired
	DoctorService doctorService;
	
	@GetMapping
	public List<Doctor> getAll(){
		return doctorService.getDoctors();
	}
	
	@GetMapping("/{doctorId}")
	public Optional<Doctor> getById(@PathVariable("doctorId") Long doctorId){
		return doctorService.getDoctorById(doctorId);
	}
	
	@PostMapping
	public Doctor getDoctor(@RequestBody Doctor doctor) {
		doctorService.saveOrUpdate(doctor);
		return doctor;
	}
	
	@DeleteMapping("/{doctorId}")
	public void deleteDoctor(@PathVariable("doctorId") Long doctorId) {
		doctorService.delete(doctorId);
	}
}

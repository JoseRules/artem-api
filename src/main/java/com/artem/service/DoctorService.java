package com.artem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artem.entity.Doctor;
import com.artem.repository.DoctorRepository;

@Service
public class DoctorService {
	@Autowired
	DoctorRepository doctorRepository;
	
	public List<Doctor> getDoctors(){
		return doctorRepository.findAll();
	}
	
	public Optional<Doctor> getDoctorById(Long id){
		return doctorRepository.findById(id);
	}
	
	public void saveOrUpdate(Doctor doctor) {
		doctorRepository.save(doctor);
	}
	
	public void delete(Long id) {
		doctorRepository.deleteById(id);
	}
	
	
}

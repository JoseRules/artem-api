package com.artem.repository;

import org.springframework.stereotype.Repository;

import com.artem.entity.Doctor;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long>{
	
}

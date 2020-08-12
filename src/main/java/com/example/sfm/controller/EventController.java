package com.example.sfm.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.sfm.dao.EventRepo;
import com.example.sfm.model.Event;

@RestController
public class EventController {
	@Autowired
	private EventRepo eventRepo;
	
	@GetMapping("/events")
	public List<Event> retrieveAllEvents(){
		System.out.println(eventRepo.findAll().toString());
		return eventRepo.findAll();
	}
	
	@GetMapping("/events/{id}")
	public Event retrieveEventById(@PathVariable Integer id){
		Optional<Event> event = eventRepo.findById(id);
		
		if(!event.isPresent()) {
			throw new ResourceNotFoundException("Event not found for this id :: " + id);
		}
		
		return event.get();
	}
	
	@PostMapping("/events")
	public ResponseEntity<Object> createEvent(@RequestBody Event event) {
		Event savedEvent = eventRepo.save(event);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedEvent.getId()).toUri();

		return ResponseEntity.created(location).build();
	}
	
	@PutMapping("/events/{id}")
	public ResponseEntity<Object> updateEvent(@PathVariable(value = "id") Integer eventId,
	  @Valid @RequestBody Event eventDetails) throws ResourceNotFoundException {
	     Event event = eventRepo.findById(eventId)
	     .orElseThrow(() -> new ResourceNotFoundException("Event not found for this id :: " + eventId));

	     event.setName(eventDetails.getName());
	     event.setStartingDate(eventDetails.getStartingDate());
	     event.setEndingDate(eventDetails.getEndingDate());
	     event.setExpenditure(eventDetails.getExpenditure());
	     final Event updatedEvent = eventRepo.save(event);
	     return ResponseEntity.ok(updatedEvent);
	}
}

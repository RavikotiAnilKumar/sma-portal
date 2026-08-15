package com.sma.awareness.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "activity_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String activityName;
    private LocalDate date;
    private Integer participantsCount;
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String geoTag;
}

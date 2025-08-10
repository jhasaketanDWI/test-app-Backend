package in.org.genSpark.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "connections")
@Getter
@Setter
public class Connection {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "investor_id", nullable = false)
	private User investor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entrepreneur_id", nullable = false)
	private User entrepreneur;

	@Column(nullable = false)
	private LocalDateTime establishedAt = LocalDateTime.now();
}


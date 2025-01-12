package io.treasurer.data.userRole;

import io.treasurer.data.AbstractEntity;
import io.treasurer.data.user.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

import java.util.UUID;

@Entity
@Getter
@Table(name = "users_roles")
public class UserRole extends AbstractEntity {
    private Role role;
    private UUID user_id;
}

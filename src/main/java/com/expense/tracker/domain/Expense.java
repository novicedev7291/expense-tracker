package com.expense.tracker.domain;

import com.expense.tracker.adapter.DecimalUtil;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import static lombok.AccessLevel.NONE;
import static lombok.AccessLevel.PRIVATE;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@NoArgsConstructor(access = PRIVATE)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@Entity
@Table(name = "expense")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Long id;
    @Column(nullable = false)
    private String category;
    private String description;
    @Column(nullable = false)
    @Getter(NONE)
    private int amountInCents;
    @Column(name = "added_on", nullable = false)
    private LocalDateTime addedOn;

    private Expense(String category, String description, int amount, LocalDateTime addedOn) {
        this.category = category;
        this.description = description;
        this.amountInCents = amount;
        this.addedOn = addedOn;
    }

    public int amount() {
        return amountInCents;
    }

    public BigDecimal amountInDecimal() {
        return DecimalUtil.centsToDecimal(amountInCents);
    }

    public static Expense of(String category, String description, int amount, LocalDateTime addedOn) {
        if(amount <= 0) throw new IllegalArgumentException("Amount cannot be less than or equal to zero");
        return new Expense(
                StringUtils.isEmpty(category) ? "Miscellaneous" : category,
                description,
                amount,
                addedOn
        );
    }
}

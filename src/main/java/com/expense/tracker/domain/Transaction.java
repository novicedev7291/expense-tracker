package com.expense.tracker.domain;

import com.expense.tracker.adapter.DecimalUtil;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import static lombok.AccessLevel.NONE;
import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@NoArgsConstructor(access = PRIVATE)
@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Integer id;
    @Enumerated
    @Getter(PACKAGE)
    private TxnType type;
    @Column(nullable = false)
    private String source;
    @Column(nullable = false)
    @Getter(NONE)
    private int amountInCents;
    @Column(name = "added_on", nullable = false)
    private LocalDateTime addedOn;

    private Transaction(String source, TxnType type, int amount, LocalDateTime addedOn) {
        this.source = source;
        this.amountInCents = amount;
        this.addedOn = addedOn;
        this.type = type;
    }

    public static Transaction of(String source, TxnType type, int amount, LocalDateTime addedOn) {
        if(amount <= 0) throw new IllegalArgumentException("Income cannot be 0 or negative");
        return new Transaction(source, type, amount, addedOn);
    }

    boolean isFromIncome() {
        return type == TxnType.INCOME;
    }

    boolean isFromSaving() {
        return type == TxnType.SAVING;
    }

    public int amount() {
        return amountInCents;
    }

    public BigDecimal amountInDecimals() {
        return DecimalUtil.centsToDecimal(amountInCents);
    }
}

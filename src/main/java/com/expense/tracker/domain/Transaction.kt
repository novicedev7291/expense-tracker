package com.expense.tracker.domain

import com.expense.tracker.adapter.DecimalUtil
import java.math.BigDecimal
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "transaction")
class Transaction (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int? = null,
        @Column(nullable = false) val source: String,
        @Enumerated val type: TxnType,
        @Column(nullable = false) val amountInCents: Int,
        @Column(name = "added_on", nullable = false) val addedOn: LocalDateTime
) {

    fun setId(id: Int) {
        this.id = id
    }

    val isFromIncome: Boolean
        get() = type == TxnType.INCOME
    val isFromSaving: Boolean
        get() = type == TxnType.SAVING

    fun amount(): Int {
        return amountInCents
    }

    fun amountInDecimals(): BigDecimal {
        return DecimalUtil.centsToDecimal(amountInCents)
    }

    companion object {
        fun of(source: String, type: TxnType, amount: Int, addedOn: LocalDateTime): Transaction {
            require(amount > 0) { "Income cannot be 0 or negative" }
            return Transaction(null, source, type, amount, addedOn)
        }
    }
}
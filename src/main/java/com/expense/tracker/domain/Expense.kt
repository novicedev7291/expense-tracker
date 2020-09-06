package com.expense.tracker.domain

import com.expense.tracker.adapter.DecimalUtil
import java.math.BigDecimal
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

/**
 * @author [Kuldeep](kuldeepyadav7291@gmail.com)
 */
@Entity
@Table(name = "expense")
class Expense (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,
        @Column(nullable = false) var category: String,
        val description: String?,
        @Column(nullable = false) val amountInCents: Int,
        @Column(name = "added_on", nullable = false) val addedOn: LocalDateTime
) {

    fun setId(id: Long) {
        this.id = id
    }

    fun amount(): Int {
        return amountInCents
    }

    fun amountInDecimal(): BigDecimal {
        return DecimalUtil.centsToDecimal(amountInCents)
    }

    companion object {
        fun of(category: String?, description: String?, amountInCents: Int, addedOn: LocalDateTime):Expense {
            val validCategory = if(category.isNullOrBlank()) "Miscellaneous" else category
            return Expense(null, validCategory, description, amountInCents, addedOn)
        }
    }

}
package com.expense.tracker.adapter.repository;

import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.domain.Transaction;
import com.expense.tracker.domain.TxnType;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class FakeTransactionRepositoryTest {
    @Test
    void mustReturnTransactionBetween2Dates() {
        FakeTransactionRepository txnRepository = new FakeTransactionRepository();
        LocalDateTime startDate = LocalDateUtil.localDateOf(2020, 10, 12);
        for (long i = 0; i < 10; i++) {
            txnRepository.save(
                    Transaction.Companion.of(
                            "Source", TxnType.INCOME, 100, startDate.plusDays(i)
                    )
            );
        }
        List<Transaction> txnsBetween = txnRepository.findTransactionsBetween(
                startDate,
                LocalDateUtil.localDateOf(2020, 10, 22)
        );
        assertThat(txnsBetween.size()).isEqualTo(10);
    }
}

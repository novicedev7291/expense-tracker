package com.expense.tracker.adapter.service;

import com.expense.tracker.adapter.DecimalUtil;
import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.web.ExpenseCsvContent;
import com.expense.tracker.adapter.web.NewExpenseCommand;
import com.expense.tracker.adapter.web.NewIncomeCommand;
import com.expense.tracker.adapter.web.NewSavingCommand;
import com.expense.tracker.domain.Expense;
import com.expense.tracker.domain.ExpenseRepository;
import com.expense.tracker.domain.ExpenseSheet;
import com.expense.tracker.domain.TransactionRepository;
import com.expense.tracker.domain.TxnType;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.util.List;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Service
@CommonsLog
public class ExpenseSheetService {
    private final TransactionRepository txnRepository;
    private final ExpenseRepository expenseRepository;

    public ExpenseSheetService(TransactionRepository txnRepository, ExpenseRepository expenseRepository) {
        this.txnRepository = txnRepository;
        this.expenseRepository = expenseRepository;
    }

    public void addNewExpenseInSheet(final NewExpenseCommand command) {
        log.info(command);
        final Clock clock = LocalDateUtil.fixedClockFor(command.getMonthYear());
        ExpenseSheet sheet = new ExpenseSheet(clock, txnRepository, expenseRepository);
        sheet.addExpense(
                command.getCategory(),
                command.getDescription(),
                DecimalUtil.decimalToCents(command.getAmount()),
                LocalDateUtil.dateFromUIFormat(command.getDate())
        );
    }

    public void addIncomeSourceInSheet(final NewIncomeCommand command) {
        final Clock clock = LocalDateUtil.fixedClockFor(command.getMonthYear());
        ExpenseSheet sheet = new ExpenseSheet(clock, txnRepository, expenseRepository);
        sheet.addTransaction(
                command.getSource(),
                TxnType.INCOME,
                DecimalUtil.decimalToCents(command.getAmount()),
                LocalDateUtil.dateFromUIFormat(command.getDate())
                );
    }

    public void addSavingInSheet(final NewSavingCommand command) {
        final Clock clock = LocalDateUtil.fixedClockFor(command.getMonthYear());
        ExpenseSheet sheet = new ExpenseSheet(clock, txnRepository, expenseRepository);
        sheet.addTransaction(
                command.getSource(),
                TxnType.SAVING,
                DecimalUtil.decimalToCents(command.getAmount()),
                LocalDateUtil.dateFromUIFormat(command.getDate())
        );
    }

    public ExpenseSheet getExpenseSheetFor(final String monthYear) {
        final Clock clock = LocalDateUtil.fixedClockFor(monthYear);
        return new ExpenseSheet(clock, txnRepository, expenseRepository);
    }

    public void importExpensesFromCsv(final ExpenseCsvContent content) {
        final Clock clock = LocalDateUtil.fixedClockFor(content.getMonthYear());
        ExpenseSheet sheet = new ExpenseSheet(clock, txnRepository, expenseRepository);
        List<Expense> expensesFromCsv = ExpenseCsvImporter.importFrom(content.asLines());
        sheet.addAllExpenses(expensesFromCsv);
    }
}

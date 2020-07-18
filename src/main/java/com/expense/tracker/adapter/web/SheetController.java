package com.expense.tracker.adapter.web;

import com.expense.tracker.adapter.DecimalUtil;
import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.service.ExpenseSheetService;
import com.expense.tracker.domain.Expense;
import com.expense.tracker.domain.ExpenseSheet;
import com.expense.tracker.domain.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@RestController
@RequestMapping("/api")
public class SheetController {
    private final ExpenseSheetService service;

    public SheetController(ExpenseSheetService service) {
        this.service = service;
    }

    @PostMapping(value = "/expenses",
            produces = APPLICATION_JSON_VALUE,
            consumes = APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ExpenseDto> addExpense(@RequestBody NewExpenseCommand command) {
        Expense addedExpense = service.addNewExpenseInSheet(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(createExpenseDtoFrom(addedExpense));
    }

    @GetMapping(value = "/expenses", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ExpenseDto>> getAllExpenses(@RequestParam String monthYear) {
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        final List<ExpenseDto> expenseDtoList = sheet.expenses().stream()
                .map(this::createExpenseDtoFrom).collect(toList());
        return ResponseEntity.status(HttpStatus.OK).body(expenseDtoList);
    }

    @GetMapping(value = "/incomeSources", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TransactionDto>> getAllIncomeSources(@RequestParam String monthYear) {
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        final List<TransactionDto> incomeSources = sheet.incomeSources().stream()
                .map(this::createTxnDtoFrom)
                .collect(toList());
        return ResponseEntity.status(HttpStatus.OK).body(incomeSources);
    }

    private TransactionDto createTxnDtoFrom(Transaction txn) {
        return new TransactionDto(
                txn.getId(), txn.getSource(),
                txn.amountInDecimals(),
                LocalDateUtil.dateToUIFormat(txn.getAddedOn())
        );
    }

    @GetMapping(value = "/savings", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TransactionDto>> getAllSavings(@RequestParam String monthYear) {
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        final List<TransactionDto> savings = sheet.savings().stream()
                .map(this::createTxnDtoFrom)
                .collect(toList());
        return ResponseEntity.status(HttpStatus.OK).body(savings);
    }

    private ExpenseDto createExpenseDtoFrom(Expense expense) {
        ExpenseDto expenseDto = new ExpenseDto();
        expenseDto.setCategory(expense.getCategory());
        expenseDto.setDescription(expense.getDescription());
        expenseDto.setId(expense.getId());
        expenseDto.setAddedOn(LocalDateUtil.dateToUIFormat(expense.getAddedOn()));
        expenseDto.setAmount(expense.amountInDecimal());
        return expenseDto;
    }

    @PostMapping(value = "/savings",
            produces = APPLICATION_JSON_VALUE,
            consumes = APPLICATION_JSON_VALUE
    )
    public ResponseEntity<TransactionDto> addSaving(@RequestBody NewSavingCommand command) {
        Transaction incomeTxn = service.addSavingInSheet(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(createTxnDtoFrom(incomeTxn));
    }

    @PostMapping(value = "/incomeSources",
            produces = APPLICATION_JSON_VALUE,
            consumes = APPLICATION_JSON_VALUE
    )
    public ResponseEntity<TransactionDto> addIncome(@RequestBody NewIncomeCommand command) {
        Transaction savingTxn = service.addIncomeSourceInSheet(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(createTxnDtoFrom(savingTxn));
    }

    @GetMapping(value = "/summary", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<SummaryDto> getSummaryFor(@RequestParam String monthYear) {
        final ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        int totalIncome = sheet.totalIncome();
        int totalExpenses = sheet.totalExpense();
        int totalSaving = sheet.totalSaving();
        return ResponseEntity.status(HttpStatus.OK).body(
                new SummaryDto(
                        DecimalUtil.inRupeesFormat(totalIncome),
                        DecimalUtil.inRupeesFormat(totalExpenses),
                        DecimalUtil.inRupeesFormat(totalSaving),
                        DecimalUtil.inRupeesFormat(
                                totalIncome - totalSaving - totalExpenses
                        )
                )
        );
    }

    @PostMapping(value = "/import")
    public ResponseEntity<String> importExpenses(@RequestBody ExpenseCsvContent content) {
        service.importExpensesFromCsv(content);
        return ResponseEntity.status(HttpStatus.CREATED).body("success");
    }
}

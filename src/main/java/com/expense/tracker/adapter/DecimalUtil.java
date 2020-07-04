package com.expense.tracker.adapter;

import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

import static lombok.AccessLevel.PRIVATE;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@NoArgsConstructor(access = PRIVATE)
public class DecimalUtil {
    public static int decimalToCents(BigDecimal amount) {
        return amount.scaleByPowerOfTen(2).intValue();
    }

    public static BigDecimal centsToDecimal(int amountInCents) {
        return new BigDecimal(amountInCents).scaleByPowerOfTen(-2);
    }

    public static String inRupeesFormat(int amount) {
        Locale locale = new Locale("en", "IN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(locale);
        return nf.format(centsToDecimal(amount));
    }

    public static BigDecimal rupeesToDecimal(String amtFromUI) throws ParseException {
        Locale locale = new Locale("en", "IN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(locale);
        Number number = nf.parse(amtFromUI);
        return BigDecimal.valueOf(number.doubleValue());
    }
}

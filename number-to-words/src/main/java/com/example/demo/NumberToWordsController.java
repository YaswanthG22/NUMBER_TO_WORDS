package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NumberToWordsController {

    private final String[] ones = {"", "One", "Two", "Three", "Four", "Five", "Six",
            "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
            "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};

    private final String[] tens = {"", "", "Twenty", "Thirty", "Forty", "Fifty",
            "Sixty", "Seventy", "Eighty", "Ninety"};

    @GetMapping("/convert")
    public String convertNumber(@RequestParam long number) {
        if (number == 0) return "(Rs. Zero Only)";

        String words = convertToIndianSystem(number).trim();
        return "(Rs. " + words + " Only)";
    }
    
    
    
    private String helper(int num) {
        if (num == 0) return "";
        else if (num < 20) return ones[num] + " ";
        else return tens[num / 10] + " " + ones[num % 10] + " ";
    }

    private String convertToIndianSystem(long num) {
        StringBuilder result = new StringBuilder();

        if (num >= 10000000) {
            result.append(helper((int) (num / 10000000))).append("Crore ");
            num %= 10000000;
        }
        if (num >= 100000) {
            result.append(helper((int) (num / 100000))).append("Lakh ");
            num %= 100000;
        }
        if (num >= 1000) {
            result.append(helper((int) (num / 1000))).append("Thousand ");
            num %= 1000;
        }
        if (num >= 100) {
            result.append(helper((int) (num / 100))).append("Hundred");
            num %= 100;
            if (num > 0) {
                result.append(" And ");
            } else {
                result.append(" ");
            }
        }
        if (num > 0) {
            result.append(helper((int) num));
        }

        return result.toString().replaceAll("\\s+", " ").trim();
    }
}

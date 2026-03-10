"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Currency = "MAD" | "EUR" | "USD";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountInMAD: number | string) => string;
}

const EXCHANGE_RATES = {
    MAD: 1,
    EUR: 10.8,
    USD: 10.0,
};

const SYMBOLS = {
    MAD: "DH",
    EUR: "€",
    USD: "$",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>("MAD");

    // Initialize from localStorage on mount
    useEffect(() => {
        const savedCurrency = localStorage.getItem("preferredCurrency") as Currency;
        if (savedCurrency && ["MAD", "EUR", "USD"].includes(savedCurrency)) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        localStorage.setItem("preferredCurrency", newCurrency);
    };

    const formatPrice = (amountInMAD: number | string) => {
        // Handle potential string inputs (e.g., from old data or "24 500 000 DH" format if we have to parse it, though we prefer priceNumeric)
        // Ideally, we always pass priceNumeric. If it's a string, try to parse it safely by removing non-numeric characters except dots.
        let numericAmount = 0;

        if (typeof amountInMAD === 'number') {
            numericAmount = amountInMAD;
        } else if (typeof amountInMAD === 'string') {
            // Basic parsing attempt if string is passed.
            const cleanedString = amountInMAD.replace(/[^0-9.-]+/g, "");
            numericAmount = parseFloat(cleanedString);

            if (isNaN(numericAmount)) {
                return amountInMAD; // Return original string if it can't be parsed (e.g. "Sur demande")
            }
        }

        const convertedAmount = numericAmount / EXCHANGE_RATES[currency];

        // Format with thousand separators
        const formattedNumber = convertedAmount.toLocaleString("fr-FR", {
            maximumFractionDigits: 0, // usually we don't show cents for high-end properties
        });

        // Append symbol based on currency
        if (currency === "USD") {
            return `${SYMBOLS[currency]}${formattedNumber}`;
        }

        return `${formattedNumber} ${SYMBOLS[currency]}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}

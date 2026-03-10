"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CompareProperty {
    id: string | number;
    title: string;
    price: string | number;
    priceNumeric?: number;
    location: string;
    surface?: number;
    bedrooms?: number;
    bathrooms?: number;
    images?: string[];
    features?: {
        area?: number;
        beds?: number;
        baths?: number;
        [key: string]: any;
    };
    amenities?: string[];
}

interface CompareContextType {
    selectedProperties: CompareProperty[];
    addProperty: (property: CompareProperty) => void;
    removeProperty: (id: string | number) => void;
    clearCompare: () => void;
    isComparing: boolean;
    setIsComparing: (val: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [selectedProperties, setSelectedProperties] = useState<CompareProperty[]>([]);
    const [isComparing, setIsComparing] = useState(false);

    // Initialize from local storage if desired, but for now we'll keep it simple in memory
    // to avoid hydration issues unless specifically needed.

    const addProperty = (property: CompareProperty) => {
        setSelectedProperties(prev => {
            if (prev.length >= 3) {
                // Return existing if already 3
                // Ideally trigger a toast notification here
                return prev;
            }
            if (!prev.find(p => p.id === property.id)) {
                return [...prev, property];
            }
            return prev;
        });
    };

    const removeProperty = (id: string | number) => {
        setSelectedProperties(prev => {
            const newProps = prev.filter(p => p.id !== id);
            if (newProps.length === 0) {
                setIsComparing(false); // Close modal if last item is removed while comparing
            }
            return newProps;
        });
    };

    const clearCompare = () => {
        setSelectedProperties([]);
        setIsComparing(false);
    };

    return (
        <CompareContext.Provider value={{
            selectedProperties,
            addProperty,
            removeProperty,
            clearCompare,
            isComparing,
            setIsComparing
        }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (context === undefined) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}

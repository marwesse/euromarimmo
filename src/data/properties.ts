export interface Property {
    id: string;
    title: string;
    type: 'Villa' | 'Appartement de Luxe' | 'Penthouse' | 'Duplex';
    transactionType: 'Vente' | 'Location';
    status: 'Nouveau' | 'Vendu' | 'Disponible';
    price: string;
    priceNumeric: number;
    location: string;
    city: string;
    features: {
        beds: number;
        baths: number;
        area: number; // in square meters
        yearBuilt: number;
    };
    amenities: string[];
    description: string;
    images: string[];
}

export const properties: Property[] = [
    {
        id: "p1",
        title: "Villa d'Exception Vue Océan",
        type: "Villa",
        transactionType: "Vente",
        status: "Nouveau",
        price: "24 500 000 DH",
        priceNumeric: 24500000,
        location: "Anfa Supérieur, Casablanca",
        city: "Casablanca",
        features: {
            beds: 6,
            baths: 6,
            area: 1200,
            yearBuilt: 2021,
        },
        amenities: ["Piscine", "Climatisation", "Garage", "Sécurité 24/7", "Smart Home", "Jardin", "Hammam"],
        description: "Nichée au cœur d'Anfa Supérieur, cette villa spectaculaire offre une vue imprenable sur l'océan. Design contemporain alliant touches traditionnelles marocaines et confort moderne absolu. Vastes espaces de réception baignés de lumière, piscine à débordement de 25m, et jardins luxuriants.",
        images: ["/properties/villa-atlas.png", "/properties/villa-californie.png", "/properties/villa-tanger.png"],
    },
    {
        id: "p2",
        title: "Appartement Signature Gauthier",
        type: "Appartement de Luxe",
        transactionType: "Vente",
        status: "Disponible",
        price: "8 900 000 DH",
        priceNumeric: 8900000,
        location: "Gauthier / Racine, Casablanca",
        city: "Casablanca",
        features: {
            beds: 4,
            baths: 4,
            area: 320,
            yearBuilt: 2022,
        },
        amenities: ["Piscine sur le toit", "Climatisation", "Spa/Hammam", "Terrasse panoramique"],
        description: "Appartement de luxe exceptionnel conçu par un architecte de renom, situé au cœur du quartier Gauthier. Beaux volumes, suites élégantes décorées d'artisanat local raffiné, et immense terrasse offrant une vue imprenable sur la métropole casablancaise.",
        images: ["/properties/riad.png", "/properties/appart-rabat.png", "/properties/penthouse-casa.png"],
    },
    {
        id: "p3",
        title: "Penthouse Océan Corniche",
        type: "Penthouse",
        transactionType: "Vente",
        status: "Vendu",
        price: "16 000 000 DH",
        priceNumeric: 16000000,
        location: "Corniche, Casablanca",
        city: "Casablanca",
        features: {
            beds: 4,
            baths: 4,
            area: 380,
            yearBuilt: 2023,
        },
        amenities: ["Climatisation", "Garage", "Sécurité 24/7", "Smart Home", "Vue Mer", "Accès privé"],
        description: "Somptueux penthouse au dernier étage d'une résidence ultra-moderne sur la Corniche. Baies vitrées du sol au plafond offrant une vue panoramique infinie sur l'Océan Atlantique. Matériaux nobles, domotique de pointe et immense terrasse de 150m² idéale pour les réceptions.",
        images: ["/properties/penthouse-casa.png", "/properties/villa-atlas.png", "/properties/riad.png"],
    },
    {
        id: "p4",
        title: "Villa Contemporaine Californie",
        type: "Villa",
        transactionType: "Vente",
        status: "Nouveau",
        price: "32 000 000 DH",
        priceNumeric: 32000000,
        location: "Californie, Casablanca",
        city: "Casablanca",
        features: {
            beds: 7,
            baths: 8,
            area: 2000,
            yearBuilt: 2024,
        },
        amenities: ["Piscine", "Climatisation", "Garage", "Sécurité 24/7", "Smart Home", "Jardin", "Salle de sport", "Cinéma maison"],
        description: "Propriété de très grand prestige dans le quartier le plus exclusif de Casablanca. Architecture minimaliste aux lignes épurées. Espaces de vie monumentaux, suite de maître de 120m², installations de loisirs de classe mondiale incluant piscine intérieure, hammam et home cinéma.",
        images: ["/properties/villa-californie.png", "/properties/villa-tanger.png", "/properties/appart-rabat.png"],
    },
    {
        id: "p5",
        title: "Duplex Golf de Bouskoura",
        type: "Duplex",
        transactionType: "Location",
        status: "Disponible",
        price: "6 500 DH / nuit",
        priceNumeric: 6500,
        location: "Bouskoura, Casablanca",
        city: "Casablanca",
        features: {
            beds: 5,
            baths: 4,
            area: 680,
            yearBuilt: 2020,
        },
        amenities: ["Climatisation", "Garage", "Sécurité 24/7", "Accès Golf", "Jardin privatif"],
        description: "Situé en plein cœur de la forêt de Bouskoura et ouvrant directement sur le green. Ce magnifique duplex moderne offre une immersion totale dans la nature tout en bénéficiant des commodités de la ville verte. Espaces ouverts, finitions haut de gamme et luminosité exceptionnelle.",
        images: ["/properties/appart-rabat.png", "/properties/riad.png", "/properties/villa-atlas.png"],
    },
    {
        id: "p6",
        title: "Villa Océanique Dar Bouazza",
        type: "Villa",
        transactionType: "Location",
        status: "Nouveau",
        price: "5 500 DH / nuit",
        priceNumeric: 5500,
        location: "Dar Bouazza, Casablanca",
        city: "Casablanca",
        features: {
            beds: 5,
            baths: 5,
            area: 850,
            yearBuilt: 2018,
        },
        amenities: ["Piscine", "Climatisation", "Garage", "Sécurité 24/7", "Jardin", "Vue Mer", "Accès direct plage"],
        description: "Une oasis de sérénité sur la côte de Dar Bouazza. Villa au design épuré en parfaite harmonie avec son environnement naturel préservé. Jardins en restanques descendant vers la mer, vastes terrasses ombragées et piscine à débordement dominant l'océan.",
        images: ["/properties/villa-tanger.png", "/properties/villa-californie.png", "/properties/penthouse-casa.png"],
    }
];
